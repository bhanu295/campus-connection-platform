import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { prisma } from '../lib/prisma';
import { hashPassword, verifyPassword, generateToken, getUserFromToken } from '../lib/auth';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const user = await getUserFromToken(token);
    if (!user) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Role-based authorization middleware
const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    if (!roles.includes(user.role)) {
      res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      return;
    }

    next();
  };
};

// Auth Routes
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // Generate JWT token
    const token = generateToken(user);

    return res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    // Find the user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the role matches
    if (role.toUpperCase() !== user.role) {
      return res.status(400).json({ message: 'Invalid role for this user' });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Materials Routes
app.get('/api/materials', async (req: Request, res: Response) => {
  try {
    const materials = await prisma.material.findMany({
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return res.json(materials);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/materials', authenticate, async (req: Request, res: Response) => {
  try {
    const { title, subject, department, type, fileUrl, fileSize, year } = req.body;
    const user = (req as any).user;

    const material = await prisma.material.create({
      data: {
        title,
        subject,
        department,
        type,
        fileUrl,
        fileSize,
        year,
        uploader: {
          connect: { id: user.id },
        },
      },
    });

    return res.status(201).json(material);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/materials/:id/download', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const material = await prisma.material.update({
      where: { id },
      data: {
        downloads: {
          increment: 1,
        },
      },
    });
    
    return res.json(material);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Events Routes
app.get('/api/events', async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/events/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/events', authenticate, async (req: Request, res: Response) => {
  try {
    const { title, date, time, location, description } = req.body;
    const user = (req as any).user;

    const event = await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        time,
        location,
        description,
        createdBy: {
          connect: { id: user.id },
        },
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Notices Routes
app.get('/api/notices', async (req: Request, res: Response) => {
  try {
    const notices = await prisma.notice.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
    res.json(notices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/notices', authenticate, authorize(['ADMIN', 'FACULTY']), async (req: Request, res: Response) => {
  try {
    const { title, content, priority } = req.body;
    const user = (req as any).user;

    const notice = await prisma.notice.create({
      data: {
        title,
        content,
        priority,
        createdBy: {
          connect: { id: user.id },
        },
      },
    });

    res.status(201).json(notice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Forum Routes
app.get('/api/forum', async (req: Request, res: Response) => {
  try {
    const posts = await prisma.forumPost.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/forum/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.forumPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/forum', authenticate, async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const user = (req as any).user;

    const post = await prisma.forumPost.create({
      data: {
        title,
        content,
        author: {
          connect: { id: user.id },
        },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/forum/:id/reply', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user = (req as any).user;

    const reply = await prisma.forumReply.create({
      data: {
        content,
        post: {
          connect: { id },
        },
        author: {
          connect: { id: user.id },
        },
      },
    });

    res.status(201).json(reply);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Routes
app.get('/api/admin/users', authenticate, authorize(['ADMIN']), async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
