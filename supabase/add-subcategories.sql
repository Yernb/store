-- Migration to add subcategory support
-- Add parent_category_id column to categories table
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS parent_category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE;

-- Create index for faster queries on parent_category_id
CREATE INDEX IF NOT EXISTS idx_categories_parent_category_id ON categories(parent_category_id);

-- Update the unique constraint to allow same name for different parent categories
-- First, drop the existing unique constraint on name
ALTER TABLE categories DROP CONSTRAINT IF EXISTS categories_name_key;

-- Add a new unique constraint that allows same name only if they have different parents
-- (NULL parent means top-level category, which should be unique)
CREATE UNIQUE INDEX IF NOT EXISTS categories_name_parent_unique 
ON categories(name, COALESCE(parent_category_id, -1));

