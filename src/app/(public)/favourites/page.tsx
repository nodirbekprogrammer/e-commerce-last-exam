import { Metadata } from 'next';
import React from 'react'

import FavoritesSection from '@/components/sections/favorites/Favorites';

export const metadata: Metadata = {
  title: "Amazon | Sevimlilar",
  description: "E-commerce website favorite side",
};

const FavoritesPage = () => {
  return (
    <FavoritesSection/>
  )
}

export default FavoritesPage