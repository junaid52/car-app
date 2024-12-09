import CarCard from './car-card/car-card';

export default async function CarCards({ cars }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {cars.map((car) => (
        <CarCard
          key={car.id}
          model={car.model}
          image={car?.images[0] ?? null}
          price={car.price}
        />
      ))}
    </div>
  );
}
