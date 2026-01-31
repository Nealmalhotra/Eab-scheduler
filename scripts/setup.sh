#!/bin/bash

# Interview Scheduler Setup Script

echo "🚀 Setting up Interview Scheduler..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your actual credentials before proceeding!"
    echo "   You need to set:"
    echo "   - DATABASE_URL"
    echo "   - SMTP credentials"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Ask if user wants to initialize the database
read -p "Do you want to initialize the database now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "🗄️  Initializing database..."
    # Extract database connection details from .env
    source .env

    if [ -z "$DATABASE_URL" ]; then
        echo "❌ DATABASE_URL not found in .env file"
        exit 1
    fi

    # Run the SQL script
    psql $DATABASE_URL -f scripts/init-db.sql

    if [ $? -eq 0 ]; then
        echo "✅ Database initialized successfully!"
    else
        echo "❌ Database initialization failed"
        exit 1
    fi
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then visit http://localhost:3000"
