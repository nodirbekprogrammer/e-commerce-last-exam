import Image from "next/image";
import "./style.scss";
import Link from "next/link";

type PropTypes = {
  name: string;
  imageUrl: string;
  categoryId: string;
};

const CategoryCard = ({ name, imageUrl, categoryId }: PropTypes) => {
  return (
    <Link href={`/categories/${categoryId}`} className="category-card">
      <div className="category-card__img">
        <Image fill objectFit="cover" src={imageUrl} alt="category-img" />
      </div>
      <h2 className="category-card__name">{name}</h2>
    </Link>
  );
};

export default CategoryCard;
