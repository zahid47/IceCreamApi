const bodySerializer = (body: any) => {
  let ingredients: string[] = body.ingredients?.split(",");
  ingredients = ingredients?.map((ingredient) => {
    return ingredient.trim().toUpperCase();
  });

  let serializedBody: any = {
    name: body.name,
    brand: body.brand,
    subhead: body.subhead,
    description: body.description,
    ingredients: ingredients,
  };

  if (body.index) serializedBody.index = parseInt(body.index);
  if (body.rating) serializedBody.rating = parseInt(body.rating);

  return serializedBody;
};

export default bodySerializer;
