# Subcategories Setup Guide

If subcategories are not displaying in your categories, follow these steps to fix the issue.

## Problem

Subcategories may not display if:
1. The database was created with an older version of `schema.sql` that didn't include the `parent_category_id` column
2. Categories exist but don't have parent-child relationships set up
3. The migration to add subcategory support hasn't been run

## Solution

### Step 1: Check if parent_category_id column exists

Run this query in your Supabase SQL Editor:

```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'categories' AND column_name = 'parent_category_id';
```

If this returns no rows, the column doesn't exist and you need to run the migration.

### Step 2: Run the migration (if needed)

If the column doesn't exist, run the migration in your Supabase SQL Editor:

1. Open `supabase/add-subcategories.sql`
2. Copy and paste the entire contents into the Supabase SQL Editor
3. Click "Run" to execute the migration

This will:
- Add the `parent_category_id` column to the `categories` table
- Create an index for faster queries
- Update the unique constraint to allow subcategories

### Step 3: Set up parent-child relationships

After running the migration, you need to set up the parent-child relationships. You have two options:

#### Option A: Use the seed data (recommended for new setups)

Run `supabase/seed.sql` in your Supabase SQL Editor. This will:
- Create parent categories (Dining, Seating, Storage, etc.)
- Create subcategories with proper parent relationships
- Add sample furniture items

#### Option B: Use the restore script (if you already have categories)

If you already have categories in your database, run `supabase/restore-subcategory-structure.sql` to set up the parent-child relationships for existing categories.

#### Option C: Use the Admin Panel

1. Go to `/admin` in your application
2. Use the Category Manager to add subcategories to existing parent categories
3. The admin panel will automatically set up the parent-child relationships

### Step 4: Verify the setup

Run this query to verify subcategories are set up correctly:

```sql
SELECT 
  c1.name AS parent_category,
  c2.name AS subcategory
FROM categories c1
LEFT JOIN categories c2 ON c2.parent_category_id = c1.id
WHERE c1.parent_category_id IS NULL
ORDER BY c1.name, c2.name;
```

You should see parent categories with their subcategories listed below them.

## Troubleshooting

### Subcategories still not showing?

1. **Check browser console** for any errors
2. **Verify categories have subcategories**: Run the verification query above
3. **Check that furniture items use subcategory names**: Items should have `category` values that match subcategory names (e.g., "Dining Tables", "Sofas", etc.)
4. **Clear browser cache** and refresh the page

### Database already has the column?

If `parent_category_id` exists but subcategories still don't show, the issue is likely that:
- Categories don't have parent-child relationships set up
- Furniture items are using parent category names instead of subcategory names

Run the restore script or use the admin panel to fix the relationships.

## Notes

- The updated `schema.sql` now includes `parent_category_id` from the start, so new database setups will work correctly
- If you're using an existing database, you'll need to run the migration
- Subcategories are displayed in:
  - The category sidebar (when you expand a parent category)
  - The filter panel on category pages (as filter buttons)

