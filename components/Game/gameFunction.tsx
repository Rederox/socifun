import { supabase } from "@/lib/supabaseClient";
import { data } from "autoprefixer";

export async function findGameBySlug(slug: string) {
  // Cette fonction vérifie si un jeu avec un certain slug existe dans la base de données
  // Récuperer si le slug existe  dans la bdd
  let { error } = await supabase
    .from("games")
    .select("id_game")
    .eq("slug", slug)
    .single();

  if (error) {
    return false; // En cas d'erreur, on retourne False donc l'utilisateur n'a pas été trouvé
  }
  return true; // utilsateur à étais trouver
}

export async function createGame(slug: string, title: string, md5: string) {
  // Cette fonction crée un nouveau jeu dans la base de données avec le slug, le titre et le hash md5 fournis
  const { data, error } = await supabase
    .from("games")
    .insert([{ slug, title, md5 }]);

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

  return insertedData?.id_game; // on retourne l'id_game
}

export async function createGameAndReview( // Cette fonction crée un nouveau jeu et une nouvelle critique avec des valeurs initiales
  slug: string,
  title: string,
  md5: string
) {
  const gameId = await createGame(slug, title, md5);

  const { data: reviewData, error: reviewError } = await supabase
    .from("gameReview")
    .insert([{ id_game: gameId, likes: 0, dislikes: 0, views: 0 }]);

  if (reviewError) throw reviewError;
}

export async function getSlugGameid(slug: string) {
  // Cette fonction récupère l'ID d'un jeu à partir de son slug
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
  // Cette fonction récupère les likes, dislikes et vues d'un jeu
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
  // Cette fonction trouve la critique d'un utilisateur pour un jeu spécifique
  const { data, error } = await supabase
    .from("userGamesReviews")
    .select("*")
    .eq("id_profile", profileId)
    .eq("id_game", gameId);

  if (error) throw error;

  if (data && data.length > 0) {
    return data[0]; // Retourne le premier avis si il y en a
  } else {
    return null; // Retourne null si il n'y a pas d'avis
  }
}

export async function updateGameReview(gameId: number, action: string) {
  // Cette fonction met à jour la critique d'un jeu en fonction de l'action fournie
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
      updates.likes = gameReview.likes > 0 ? gameReview.likes - 1 : 0;
      break;
    case "decreaseDislikes":
      updates.dislikes = gameReview.dislikes > 0 ? gameReview.dislikes - 1 : 0;
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
  // Cette fonction met à jour la critique d'un utilisateur pour un jeu et met à jour les statistiques de la critique du jeu en conséquence
  profileId: string,
  gameId: number,
  reviewAction: any
) {
  const { data, error } = await supabase
    .from("userGamesReviews")
    .update({ reviewAction })
    .eq("id_profile", profileId)
    .eq("id_game", gameId);

  if (error) throw error;
  if (reviewAction == "like") {
    updateGameReview(gameId, "increaseLikes");
    updateGameReview(gameId, "decreaseDislikes");
  } else if (reviewAction == "dislike") {
    updateGameReview(gameId, "increaseDislikes");
    updateGameReview(gameId, "decreaseLikes");
  }
  return data;
}

export async function createUserGameReview(
  // Cette fonction crée une nouvelle critique pour un jeu par un utilisateur et met à jour les statistiques de la critique du jeu en conséquence
  profileId: string,
  gameId: number,
  reviewAction: string
) {
  const { data, error } = await supabase
    .from("userGamesReviews")
    .insert([{ id_profile: profileId, id_game: gameId, reviewAction }]);

  if (error) throw error;

  if (reviewAction == "like") {
    updateGameReview(gameId, "increaseLikes");
  } else if (reviewAction == "dislike") {
    updateGameReview(gameId, "increaseDislikes");
  }
  return data;
}

export async function checkIfFavorited(userId: string, gameId: number) {
  // Cette fonction vérifie si un jeu est favori d'un utilisateur
  const { data, error } = await supabase
    .from("favorite")
    .select("*")
    .eq("id_profile", userId)
    .eq("id_game", gameId);

  if (error) {
    console.error(error);
    throw error;
  }

  // Si un enregistrement existe, cela signifie que le jeu est déjà favori de l'utilisateur
  if (data && data.length > 0) {
    return true;
  } else {
    return false;
  }
}

export async function createFavorite(profileId: string, gameId: number) {
  // Cette fonction ajoute un jeu aux favoris d'un utilisateur
  const { data, error } = await supabase
    .from("favorite")
    .insert([{ id_profile: profileId, id_game: gameId }]);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function removeFavorite(profileId: string, gameId: number) {
  // Cette fonction supprime un jeu des favoris d'un utilisateur
  const { data, error } = await supabase
    .from("favorite")
    .delete()
    .eq("id_profile", profileId)
    .eq("id_game", gameId);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function getFavoriteGames(profileId: string) {
  // Cette fonction récupère tous les jeux favoris d'un utilisateur
  const { data, error } = await supabase
    .from("favorite")
    .select("id_game, games (title, slug, md5)")
    .eq("id_profile", profileId);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// Cette fonction récupère tous les commentaires d'un utilisateur sur un jeu
export async function getUserGameComments(gameId: number, profileId: string) {
  const { data, error } = await supabase
    .from("gameComments")
    .select("*")
    .eq("id_game", gameId)
    .eq("id_profile", profileId);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// Cette fonction crée un nouveau commentaire sur un jeu par un utilisateur
export async function createComment(
  gameId: number,
  profileId: string,
  comment: string
) {
  // Vérifiez si l'utilisateur a déjà commenté
  const existingComments = await getUserGameComments(gameId, profileId);

  if (existingComments && existingComments.length > 0) {
    throw new Error("User has already commented");
  }

  // Si l'utilisateur n'a pas déjà commenté, ajoutez son commentaire
  const { data, error } = await supabase.from("gameComments").insert([
    {
      id_profile: profileId,
      id_game: gameId,
      comment: comment,
      time_posted: new Date(),
    },
  ]);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function getGameComments(gameId: number) {
  // Cette fonction récupère tous les commentaires sur un jeu
  const { data, error } = await supabase
    .from("gameComments")
    .select(
      `id_game, id_profile, time_posted, comment , id_gameComments,  profiles(full_name, avatar_url, avatarMode)`
    )
    .eq("id_game", gameId);

  if (error) {
    console.error(error);
    throw error;
  }
  console.log(data);
  return data;
}

export async function deleteComment(commentId: number) {
  // Cette fonction supprime un commentaire
  const { error } = await supabase
    .from("gameComments")
    .delete()
    .eq("id_gameComments", commentId);

  if (error) {
    throw error;
  }
}

// Mettre à jour un commentaire
export async function updateComment(commentId: number, updatedComment: string) {
  // Cette fonction met à jour un commentaire
  const { data, error } = await supabase
    .from("gameComments")
    .update({ comment: updatedComment })
    .eq("id_gameComments", commentId)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return true;
}
