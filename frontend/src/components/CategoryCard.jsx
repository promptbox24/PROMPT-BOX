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
        border: '3px solid rgba(255, 255, 255, 0.2)',
        padding: '32px',
        borderRadius: '24px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        minHeight: '220px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background pattern */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '150px',
        height: '150px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }}></div>

      <div>
        <div style={{ 
          fontSize: '56px', 
          marginBottom: '16px',
          lineHeight: 1,
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
          animation: 'bounce 2s ease-in-out infinite'
        }}>
          {category.icon}
        </div>
        <h3 className="heading-2" style={{ marginBottom: '12px', fontWeight: 700 }}>
          {category.title}
        </h3>
        <p className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: 500 }}>
          {category.description}
        </p>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '8px',
        color: '#FFFFFF',
        fontSize: '16px',
        fontWeight: 600,
        marginTop: '20px',
        padding: '12px 20px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        width: 'fit-content'
      }}>
        Explore
        <ArrowRight size={20} />
      </div>
    </div>
  );
};

export default CategoryCard;
