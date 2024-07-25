import * as repository from "../repository/mapRepository.js";

export async function getMap(req, res) {
  const map = await repository.getMap();
  console.log("map-->", map);
  res.json(map);
}
