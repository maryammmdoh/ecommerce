import allCategory from '@/lib/api/allCategory';
import CategorySwiper from './../categorySwipper/categorySwiper';

export default async function CategorySlider() {
  const { data } = await allCategory();

  return (
    <>

     <CategorySwiper data={data}/>
    </>

  );
}


