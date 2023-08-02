import React, { useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoryListAction } from '../../../actions/category.action';

export default function Category() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  useEffect(() => {
    dispatch(categoryListAction());
  }, [dispatch]);
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (category) => {
    return (
      <div
        className="surface-border border-round m-2 text-center py-5 px-3 my-3"
        style={{
          backgroundImage: `url(${category.image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '100px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.500)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            cursor: 'pointer',
          }}
        >
          <div style={{ border: '1px solid white', padding: '.5rem' }}>
            <Link style={{ color: 'white', textDecoration: 'none' }} to="">
              {category.name}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h4 style={{ textAlign: 'center' }}>Top Category</h4>
      <Carousel
        value={categories}
        numScroll={1}
        numVisible={6}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        showIndicators={false}
      />
    </div>
  );
}
