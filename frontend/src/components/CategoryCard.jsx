import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category, onClick }) => {
  return (
    <div 
      className="category-card"
      onClick={onClick}
      style={{
        background: category.color,
        backdropFilter: 'blur(16px)',
        border: '3px solid rgba(255, 255, 255, 0.2)',
        padding: '0',
        borderRadius: '24px',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseMove={(e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
      }}
    >
      {/* Image Section */}
      <div style={{
        height: '160px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img 
          src={category.image} 
          alt={category.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)'
        }}></div>
      </div>

      {/* Content Section */}
      <div style={{
        padding: '24px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 className="heading-2" style={{ marginBottom: '12px', fontWeight: 700, color: '#FFFFFF' }}>
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
          background: 'rgba(255, 255, 255, 0.25)',
          borderRadius: '12px',
          width: 'fit-content',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}>
          Explore
          <ArrowRight size={20} />
        </div>
      </div>

      {/* Shine effect on hover */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
        transform: 'translateX(-100%)',
        transition: 'transform 0.6s ease',
        pointerEvents: 'none'
      }} className="shine-effect"></div>
    </div>
  );
};

export default CategoryCard;
