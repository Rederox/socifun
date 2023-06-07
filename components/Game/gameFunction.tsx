import { supabase } from "@/lib/supabaseClient";
import { data } from "autoprefixer";

export async function findGameBySlug(slug: string) {
  // Récuperer si le slug existe  dans la bdd
  let { error } = await supabase
    .from("games")
    .select("id_game")
    .eq("slug", slug)
    .single();

  if (error) {
    return false;
  }
  return true;
}

export async function createGame(slug: string) {
  // Ajouter une ligne dans games avec son slug et ça retourne l'id_game
  const { data, error } = await supabase.from("games").insert([{ slug }]);

  if (error) {
    console.error(error);
    throw error;
  }

  // Récupérer l'ID de la ligne insérée en effectuant une autre requête
  const { data: insertedData, error: insertedError } = await supabase
    .from("games")
    .select("id_game")
    .eq("slug", slug)
    .single();

  if (insertedError) {
    console.error(insertedError);
    throw insertedError;
  }

  return insertedData?.id_game;
}

export async function createGameAndReview(slug: string) {
  // ajouter une ligne dans gameReview avec id_game, likes = 0, dislikes = 0 et views = 1
  const gameId = await createGame(slug);

  const { data: reviewData, error: reviewError } = await supabase
    .from("gameReview")
    .insert([{ id_game: gameId, likes: 0, dislikes: 0, views: 1 }]);

  if (reviewError) throw reviewError;
}

export async function getSlugGameid(slug: string) {
  const { data: insertedData, error: insertedError } = await supabase
    .from("games")
    .select("id_game")
    .eq("slug", slug)
    .single();

  if (insertedError) {
    console.error(insertedError);
    throw insertedError;
  }

  return insertedData?.id_game;
}

export async function getReviews(gameId: number) {
  // Récuperer les likes,dislikes et views
  const { data, error } = await supabase
    .from("gameReview")
    .select("likes, dislikes, views")
    .eq("id_game", gameId)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function findUserGameReview(profileId: string, gameId: number) {
  const { data, error } = await supabase
    .from("userGamesReviews")
    .select("*")
    .eq("id_profile", profileId)
    .eq("id_game", gameId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateGameReview(gameId: number, action: string) {
  const { data: currentData, error: fetchError } = await supabase
    .from("gameReview")
    .select("likes, dislikes, views")
    .eq("id_game", gameId);

  if (fetchError) throw fetchError;

  if (!currentData || currentData.length === 0) {
    throw new Error("No game with given id found");
  }

  let updates: { likes?: number; dislikes?: number; views?: number } = {};
  const gameReview = currentData[0];

  switch (action) {
    case "increaseLikes":
      updates.likes = (gameReview.likes || 0) + 1;
      break;
    case "increaseDislikes":
      updates.dislikes = (gameReview.dislikes || 0) + 1;
      break;
    case "increaseViews":
      updates.views = (gameReview.views || 0) + 1;
      break;
    case "decreaseLikes":
      updates.likes = (gameReview.likes || 0) - 1;
      break;
    case "decreaseDislikes":
      updates.dislikes = (gameReview.dislikes || 0) - 1;
      break;
  }

  const { data, error: updateError } = await supabase
    .from("gameReview")
    .update(updates)
    .eq("id_game", gameId);
  console.log(data); // Ajoutez cette ligne
  if (updateError) throw updateError;

  return data;
}

export async function updateUserGameReview(
  profileId: number,
  gameId: number,
  reviewAction: any
) {
  const { data, error } = await supabase
    .from("userGamesReviews")
    .update({ reviewAction })
    .eq("id_profile", profileId)
    .eq("id_game", gameId);

  if (error) throw error;
  return data;
}

export async function createUserGameReview(
  profileId: string,
  gameId: number,
  reviewAction: string
) {
  const { data, error } = await supabase
    .from("userGamesReviews")
    .insert([{ id_profile: profileId, id_game: gameId, reviewAction }]);

  if (error) throw error;

  if (reviewAction == "like") {
    updateGameReview(gameId, "increaseLikes")
  } else if (reviewAction == "dislike") {
    updateGameReview(gameId, "decreaseLikes")
  }
  return data;
}
