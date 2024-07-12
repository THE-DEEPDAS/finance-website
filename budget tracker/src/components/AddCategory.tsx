// AddCategory.tsx

import React, { useState } from 'react';

interface AddCategoryProps {
  onCategoryAdd: (category: string) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onCategoryAdd }) => {
  const [newCategory, setNewCategory] = useState<string>('');

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      onCategoryAdd(newCategory);
      setNewCategory('');
    }
  };

  return (
    <section className="add-category">
      <h2>Add Category</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Enter new category"
      />
      <button onClick={handleAddCategory}>Add Category</button>
    </section>
  );
};

export default AddCategory;
