import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category, onClick }) => {
  return (
    <div 
      className="category-card dark-hover"
      onClick={onClick}
      style={{
        background: category.color,
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-subtle)',
        padding: '32px',
        borderRadius: '0px',
        cursor: 'pointer',
        transition: 'all 0.4s ease-in-out',
        position: 'relative',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <div style={{ 
          fontSize: '48px', 
          marginBottom: '16px',
          lineHeight: 1
        }}>
          {category.icon}
        </div>
        <h3 className="heading-2" style={{ marginBottom: '12px' }}>
          {category.title}
        </h3>
        <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
          {category.description}
        </p>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '8px',
        color: 'var(--brand-primary)',
        fontSize: '16px',
        fontWeight: 500,
        marginTop: '16px'
      }}>
        Explore
        <ArrowRight size={20} />
      </div>
    </div>
  );
};

export default CategoryCard;
