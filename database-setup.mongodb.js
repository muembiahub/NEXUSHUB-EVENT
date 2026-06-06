// NEXUSHUB Event Database Setup
// Create database and collections

// Use the database
use('nexushub_event');

// Create events collection
db.createCollection('events', {
  requireAuth: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'date', 'location'],
      properties: {
        _id: { bsonType: 'objectId' },
        name: { bsonType: 'string', description: 'Event name' },
        description: { bsonType: 'string', description: 'Event description' },
        date: { bsonType: 'date', description: 'Event date' },
        location: { bsonType: 'string', description: 'Event location' },
        capacity: { bsonType: 'int', description: 'Event capacity' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Create users collection
db.createCollection('users', {
  requireAuth: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email'],
      properties: {
        _id: { bsonType: 'objectId' },
        name: { bsonType: 'string', description: 'Full user name' },
        email: { bsonType: 'string', description: 'User email address' },
        organization: { bsonType: 'string', description: 'User organization' },
        role: { bsonType: 'string', description: 'User role or title' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Create registrations collection
db.createCollection('registrations', {
  requireAuth: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'eventId'],
      properties: {
        _id: { bsonType: 'objectId' },
        userId: { bsonType: 'objectId', description: 'User ID' },
        eventId: { bsonType: 'objectId', description: 'Event ID' },
        status: { 
          bsonType: 'string', 
          description: 'Registration status',
          enum: ['registered', 'attended', 'cancelled']
        },
        registeredAt: { bsonType: 'date' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Create reviews collection
db.createCollection('reviews', {
  requireAuth: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'eventId', 'rating'],
      properties: {
        _id: { bsonType: 'objectId' },
        userId: { bsonType: 'objectId', description: 'User ID' },
        eventId: { bsonType: 'objectId', description: 'Event ID' },
        rating: { 
          bsonType: 'int', 
          description: 'Rating from 0 to 5',
          minimum: 0,
          maximum: 5
        },
        comment: { bsonType: 'string', description: 'Review comment' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' }
      }
    }
  }
});

// Insert sample data
const sampleEventIds = db.events.insertMany([
  {
    name: 'NexusHub Community Launch',
    description: 'Join local founders, partners, and community members for the NexusHub opening event, with a walkthrough of the new space, team introductions, and a small reception.',
    date: new Date('2026-07-12T18:00:00Z'),
    location: 'Downtown Conference Center',
    capacity: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Social Impact Summit',
    description: 'A one-day conference for nonprofits, civic leaders, and entrepreneurs working on technology projects that improve community outcomes.',
    date: new Date('2026-08-22T09:00:00Z'),
    location: 'NexusHub Innovation Hall',
    capacity: 300,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'AI Showcase',
    description: 'An afternoon of product demos from startups building practical AI tools, followed by a Q&A panel with investors and technologists.',
    date: new Date('2026-09-10T13:00:00Z'),
    location: 'NexusHub Demo Theater',
    capacity: 150,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Pitch Night',
    description: 'Founders present five-minute pitches to mentors and investors, then gather feedback during the networking session afterward.',
    date: new Date('2026-10-05T19:00:00Z'),
    location: 'NexusHub Auditorium',
    capacity: 180,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]).insertedIds;

const sampleUserIds = Object.values(db.users.insertMany([
  {
    name: 'Amina Mwangi',
    email: 'amina.mwangi@nexushub.co',
    organization: 'NexusHub',
    role: 'Community Manager',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'David Otieno',
    email: 'david.otieno@impactlabs.org',
    organization: 'Impact Labs',
    role: 'Program Director',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Lilian Kimani',
    email: 'lilian.kimani@aiworks.io',
    organization: 'AI Works',
    role: 'Product Lead',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Michael Njoroge',
    email: 'michael.njoroge@startuphub.com',
    organization: 'Startup Hub',
    role: 'Investor Relations',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Grace Wanjiru',
    email: 'grace.wanjiru@civictech.africa',
    organization: 'CivicTech Africa',
    role: 'Project Coordinator',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]).insertedIds);

db.registrations.insertMany([
  {
    userId: sampleUserIds[0],
    eventId: sampleEventIds[0],
    status: 'registered',
    registeredAt: new Date('2026-06-20T14:30:00Z'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: sampleUserIds[1],
    eventId: sampleEventIds[0],
    status: 'cancelled',
    registeredAt: new Date('2026-06-22T10:00:00Z'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: sampleUserIds[2],
    eventId: sampleEventIds[1],
    status: 'attended',
    registeredAt: new Date('2026-07-15T12:00:00Z'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: sampleUserIds[3],
    eventId: sampleEventIds[2],
    status: 'registered',
    registeredAt: new Date('2026-08-05T08:45:00Z'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: sampleUserIds[4],
    eventId: sampleEventIds[3],
    status: 'registered',
    registeredAt: new Date('2026-09-25T16:10:00Z'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: sampleUserIds[1],
    eventId: sampleEventIds[2],
    status: 'attended',
    registeredAt: new Date('2026-08-09T15:00:00Z'),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

db.reviews.insertMany([
  {
    userId: sampleUserIds[0],
    eventId: sampleEventIds[0],
    rating: 5,
    comment: 'Good turnout, and the opening panel gave a solid overview of NexusHub programs.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: sampleUserIds[2],
    eventId: sampleEventIds[1],
    rating: 4,
    comment: 'The summit had useful sessions, especially the case studies on community partnerships.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: sampleUserIds[3],
    eventId: sampleEventIds[2],
    rating: 5,
    comment: 'The AI Showcase featured practical tools and a good mix of product demos.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: sampleUserIds[4],
    eventId: sampleEventIds[3],
    rating: 3,
    comment: 'Pitch Night was productive, though a few teams could tighten their customer stories.',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create indexes for better query performance
db.users.createIndex({ email: 1 }, { unique: true });

db.events.createIndex({ name: 1 });
db.events.createIndex({ date: 1 });
db.events.createIndex({ location: 1 });

db.registrations.createIndex({ userId: 1 });
db.registrations.createIndex({ eventId: 1 });
db.registrations.createIndex({ userId: 1, eventId: 1 }, { unique: true });

db.reviews.createIndex({ userId: 1 });
db.reviews.createIndex({ eventId: 1 });
db.reviews.createIndex({ userId: 1, eventId: 1 }, { unique: true });

// Verify collections were created
console.log('Collections created successfully!');
console.log('Database: nexushub_event');
console.log('Collections: events, registrations, reviews, users');
