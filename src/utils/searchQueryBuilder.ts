export const searchQueryBuilder = (data: any) => {
  const searchTerm: string = data.query || data.q;
  const brand: string = data.brand?.toLowerCase();

  let minRating = data.minRating;
  if (minRating) minRating = parseFloat(minRating);

  let maxRating = data.maxRating;
  if (maxRating) maxRating = parseFloat(maxRating);

  let ingredients: string[] = data.ingredients?.split(",");
  ingredients = ingredients?.map((ingredient) => {
    return ingredient.toUpperCase();
  });

  //building the query
  let query = {};

  if (brand) {
    query = {
      ...query,
      brand: brand,
    };
  }

  if (ingredients?.length > 0) {
    query = {
      ...query,
      ingredients: { $all: ingredients },
    };
  }

  if (minRating || maxRating) {
    query = {
      ...query,
      rating: { $gte: minRating || 0, $lte: maxRating || 5 },
    };
  }

  if (searchTerm) {
    query = {
      ...query,
      $or: [
        { name: { $regex: searchTerm, $options: "ie" } },
        { subhead: { $regex: searchTerm, $options: "ie" } },
        { description: { $regex: searchTerm, $options: "ie" } },
      ],
    };
  }

  return query;
};
