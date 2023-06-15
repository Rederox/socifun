/* eslint-disable react/no-unescaped-entities */
"use client";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  SearchBySlugDocument,
  SearchBySlugQuery,
  SearchBySlugQueryVariables,
} from "@/generated";
import LoadingHamster from "@/components/LoadingSpinner/LoadingHamster";
import Link from "next/link";
import { BiFullscreen } from "react-icons/bi";
import { VscSmiley } from "react-icons/vsc";
import { IoMdMore } from "react-icons/io";
import "../../../../styles/game-like.css";
import {
  AiFillLike as Like,
  AiFillDislike as Dislike,
  AiFillEye as View,
} from "react-icons/ai";
import { MdOutlineFavorite as Favorite } from "react-icons/md";
import {
  checkIfFavorited,
  createComment,
  createFavorite,
  createGameAndReview,
  createUserGameReview,
  deleteComment,
  findGameBySlug,
  findUserGameReview,
  getGameComments,
  getReviews,
  getSlugGameid,
  removeFavorite,
  updateComment,
  updateGameReview,
  updateUserGameReview,
} from "@/components/Game/gameFunction";
import { UserContext } from "@/contexts/UserProvider";
import CountUp from "react-countup";
import Image from "next/image";
import { Avatar } from "@bigheads/core";
import EmojiPicker from "emoji-picker-react";

interface Props {
  params: { prod: string; slug: string };
}

interface Comment {
  userId: string;
  comment: string;
  commentId: number;
  time_posted: Date;
  full_name: string;
  avatar_url: string;
  avatarMode: string;
}

interface EmojiObject {
  emoji: string;
}

const GamePage = ({ params: { prod, slug } }: Props) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("GamePage component must be used within a UserProvider");
  }
  const { user, setUser, loading } = context;

  const [iframeError, setIframeError] = useState(false);
  const {
    data,
    error,
    loading: loadingUser,
  } = useQuery<SearchBySlugQuery, SearchBySlugQueryVariables>(
    SearchBySlugDocument,
    {
      variables: { slug: slug?.toString() || "" },
    }
  );
  const [gameId, setGameId] = useState<number>();
  const [isLoadingGame, setIsLoadingGame] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);

  const [liked, setLiked] = useState(false);
  const [disLiked, setDisliked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const [comment, setComment] = useState(""); // Ajouter cet état pour gérer le contenu du commentaire
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasCommented, setHasCommented] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user || !user.id || !gameId) return;
    // Essayer de créer le commentaire
    try {
      const newComment = await createComment(gameId, user.id, comment);
      setHasCommented(true);
      // Traitement du nouveau commentaire ici (par exemple, ajouter à une liste de commentaires à afficher)
    } catch (error) {
      // Gestion d'erreur ici
      console.error("Erreur lors de la création du commentaire:", error);
    }
    setComment(""); // Réinitialiser le contenu du commentaire
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (gameId !== undefined) {
        const gameComments: Comment[] = (await getGameComments(gameId)).map(
          (item: any) => ({
            commentId: item.id_gameComments,
            userId: item.id_profile,
            comment: item.comment,
            time_posted: item.time_posted,
            full_name: item.profiles.full_name,
            avatar_url: item.profiles.avatar_url,
            avatarMode: item.profiles.avatarMode,
          })
        );
        console.log(gameComments);

        setComments(gameComments);

        // Check if user has already commented
        if (user !== null) {
          if (gameComments.some((comment) => comment.userId === user.id)) {
            setHasCommented(true);
          }
        }
      }
    };
    fetchComments();
  }, [gameId, comment, user]);

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setComment((prevComment) => prevComment + emojiObject.emoji);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setComment(value);
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  const moreComment = () => {
    console.log("test");
  };

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState("");

  const handleEditComment = (commentId: number) => {
    const comment = comments.find((c) => c.commentId === commentId);
    if (comment) {
      setEditedComment(comment.comment);
      setEditingCommentId(commentId);
    }
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditedComment("");
  };

  const handleDeleteComment = async (commentId: number) => {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer ce commentaire ?"
    );
    if (confirmDelete && user) {
      try {
        await deleteComment(commentId);
        // Supprimez le commentaire de la liste des commentaires affichés
        const updatedComments = comments.filter(
          (c) => c.commentId !== commentId
        );
        setComments(updatedComments);
        setHasCommented(false);
      } catch (error) {
        console.error("Erreur lors de la suppression du commentaire:", error);
      }
    }
  };

  const handleSaveEditedComment = async (commentId: number) => {
    const comment = comments.find((c) => c.commentId === commentId);
    if (comment && user) {
      const updatedComment = await updateComment(commentId, editedComment);
      if (updatedComment) {
        // Mettez à jour le commentaire dans la liste des commentaires affichés
        const updatedComments = comments.map((c) =>
          c.commentId === commentId ? { ...c, comment: editedComment } : c
        );
        setComments(updatedComments);
        setEditingCommentId(null);
        setEditedComment("");
      } else {
        console.error("Erreur lors de la mise à jour du commentaire");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingGame(true);
      if (data?.gameSearched?.title && data?.gameSearched?.md5) {
        if (!(await findGameBySlug(slug))) {
          await createGameAndReview(
            slug,
            data.gameSearched.title,
            data.gameSearched.md5
          );
        }
        const gameId = await getSlugGameid(slug);
        setGameId(gameId);
        await updateGameReview(gameId, "increaseViews");

        const reviews = await getReviews(gameId);
        setLikes(reviews.likes);
        setDislikes(reviews.dislikes);
        setViews(reviews.views);
      }
      setIsLoadingGame(false);
    };
    fetchData();
  }, [slug, data]);

  useEffect(() => {
    const fetchUserReview = async () => {
      if (user && user.id && gameId) {
        const review = await findUserGameReview(user.id, gameId);
        if (review) {
          if (review.reviewAction == "like") {
            setLiked(true);
          } else if (review.reviewAction == "dislike") {
            setDisliked(true);
          }
        }
      }
    };

    fetchUserReview();
  }, [user, gameId]);

  const handleLike = async () => {
    if (user && user.id && gameId && !isLoadingGame) {
      // Vérifiez d'abord si l'utilisateur a déjà fait une review pour ce jeu
      const userReview = await findUserGameReview(user.id, gameId);

      // Si l'utilisateur n'a pas déjà fait une review pour ce jeu, créez-en une
      if (userReview == null) {
        await createUserGameReview(user.id, gameId, "like");
        setLikes((prev) => prev + 1);
        setLiked(true);
      }
      // Si l'utilisateur a déjà fait une review et qu'elle est "dislike", mettez à jour la review en "like"
      else if (userReview.reviewAction == "dislike") {
        await updateUserGameReview(user.id, gameId, "like");
        setLikes((prev) => prev + 1);
        setDislikes((prev) => prev - 1);
        setLiked(true);
        setDisliked(false);
      }
    }
  };

  const handleDislike = async () => {
    if (user && user.id && gameId && !isLoadingGame) {
      const existingReview = await findUserGameReview(user.id, gameId);

      if (existingReview) {
        if (existingReview.reviewAction === "dislike") {
          return;
        } else {
          await updateUserGameReview(user.id, gameId, "dislike");
          if (existingReview.reviewAction === "like") {
            setLikes((prev) => prev - 1);
            setLiked(false);
          }
        }
      } else {
        await createUserGameReview(user.id, gameId, "dislike");
      }

      setDislikes((prev) => prev + 1);
      setDisliked(true);
    }
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && user.id && gameId) {
        const isFavorited = await checkIfFavorited(user.id, gameId);
        setFavorited(isFavorited);
      }
    };

    checkFavoriteStatus();
  }, [user, gameId]);

  const [favoriting, setFavoriting] = useState(false);
  const toggleFavorite = async () => {
    if (user && user.id && gameId && !isLoadingGame && !favoriting) {
      setFavoriting(true);
      const alreadyFavorited = await checkIfFavorited(user.id, gameId);
      if (alreadyFavorited) {
        await removeFavorite(user.id, gameId);
        setFavorited(false);
      } else {
        await createFavorite(user.id, gameId);
        setFavorited(true);
      }
      setFavoriting(false);
    }
  };

  const iframeUrl =
    prod === "CG"
      ? `https://games.crazygames.com/en_US/${slug}/index.html`
      : prod === "GD" && data
      ? `https://html5.gamedistribution.com/${data.gameSearched?.md5}`
      : "";

  const handleIframeError = () => setIframeError(true);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Image src={"/logoFull.svg"} alt={""} width={300} height={300} />
        <LoadingHamster />
      </div>
    );

  if (error || iframeError)
    return (
      <p className="text-center text-xl text-red-500 flex items-center justify-center h-screen">
        Oops! Le jeu n'a pas réussi à se charger.
      </p>
    );

  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const goFullscreen = () => {
    const iframe = document.getElementById("game-iframe") as HTMLIFrameElement;
    if (iframe) {
      iframe.requestFullscreen();
    }
  };

  return (
    <div className="flex w-[99%] rounded-md flex-col items-center justify-center bg-[#2e2e52] p-4">
      <h1 className="text-4xl text-white font-bold mb-4">
        {data?.gameSearched?.title}
      </h1>
      <div className="h-[70vh] w-full lg:w-[90%] rounded-md overflow-hidden my-4 flex flex-col items-end">
        <button
          onClick={goFullscreen}
          className="font-bold text-[30px] absolute text-[#2e2e52]"
        >
          <BiFullscreen />
        </button>

        <iframe
          id="game-iframe"
          className="w-full h-full"
          src={iframeUrl}
          title={data?.gameSearched?.title || ""}
          scrolling="no"
          allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write;"
          allowFullScreen
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups"
          loading="eager"
          data-hj-allow-iframe="true"
          onError={handleIframeError}
        ></iframe>
        <div
          className="flex justify-center items-center gap-4 flex-wrap
        "
        >
          <div className="flex flex-row items-center justify-center gap-1 text-[#9c9c9c]">
            <View className="text-[26px] " />
            <CountUp end={views ? views : 0} duration={0.8} />
          </div>
          <div className="flex flex-row items-center justify-center gap-1 text-white">
            <Like
              className={`text-[26px] cursor-pointer ${
                liked ? "text-blue-500" : ""
              }`}
              onClick={handleLike}
            />
            <CountUp end={likes ? likes : 0} duration={0.8} />
          </div>
          <div className="flex flex-row items-center justify-center gap-1 text-white">
            <Dislike
              className={`text-[26px] cursor-pointer ${
                disLiked ? "text-blue-500" : ""
              }`}
              onClick={handleDislike}
            />
            <CountUp end={dislikes ? dislikes : 0} duration={0.8} />
          </div>
          <div className="flex flex-row items-center justify-center gap-1 text-white">
            <label className="container" onClick={toggleFavorite}>
              <input type="checkbox" checked={favorited} readOnly />
              <div className="checkmark">
                <svg viewBox="0 0 256 256">
                  <rect fill="none" height="256" width="256"></rect>
                  <path
                    d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                    strokeWidth="20px"
                    stroke="#FFF"
                    fill="none"
                  ></path>
                </svg>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[90%] text-white text-lg">
        <div className="my-2">
          <h2 className="text-2xl font-bold mb-2">Description</h2>
          <p className="bg-gray-800 p-4 rounded-md">
            {data?.gameSearched?.description}
          </p>
        </div>
        <div className="my-2">
          <h2 className="text-2xl font-bold mb-2">Instruction</h2>
          <p className="bg-gray-800 p-4 rounded-md">
            {data?.gameSearched?.instruction}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="bg-gray-800 p-4 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10">
            <h2 className="font-bold mb-2 text-xl">Catégories</h2>
            <div className="flex flex-wrap">
              {data?.gameSearched?.categories?.map((category, i) => (
                <Link href={`/Category/${category}`} key={category + i}>
                  <div className="m-1 bg-gray-950 bg-opacity-50 text-white px-2 py-1 rounded-md hover:bg-opacity-75 transition-colors duration-300 ease-in-out">
                    {category}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10">
            <h2 className="font-bold mb-2 text-xl">Entreprise</h2>
            <p>{data?.gameSearched?.company}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10">
            <h2 className="font-bold mb-2 text-xl">Type</h2>
            <p>{`${data?.gameSearched?.type} / ${data?.gameSearched?.subType}`}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10">
            <h2 className="font-bold mb-2 text-xl">Sortie le</h2>
            <p>{formatDate(data?.gameSearched?.publishedAt)}</p>
          </div>
        </div>
      </div>

      <div className="my-2 w-full lg:w-[90%]">
        <h2 className="text-2xl font-bold mb-2 text-white">Commentaire</h2>

        {user ? (
          <>
            {hasCommented ? (
              <></>
            ) : (
              <form
                className="mt-2 w-full bg-gray-800 p-4 rounded-md mb-4"
                onSubmit={handleCommentSubmit}
              >
                <div className="flex flex-col space-y-2">
                  <div className="relative">
                    <textarea
                      className="bg-gray-900 text-white placeholder-gray-400 px-3 py-2 rounded-lg w-full h-20"
                      placeholder="Ajouter un commentaire"
                      value={comment}
                      onChange={handleCommentChange}
                      required
                    />
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <button onClick={toggleEmojiPicker} type="button">
                        <VscSmiley className="w-8 h-8 text-[#f5ab00]" />
                      </button>
                      <button
                        className="bg-gray-950 text-white p-2 rounded-lg w-full"
                        type="submit"
                      >
                        Commenter
                      </button>
                    </div>
                    <div className="absolute bottom-[150px]">
                      {showEmojiPicker && (
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </>
        ) : (
          <p className="w-full lg:w-[90%] bg-gray-800 p-4 text-white rounded-md shadow-lg mb-4">
            Vous devez être connecté pour laisser un commentaire.
          </p>
        )}

        {comments.map((comment, index) => (
          <div
            key={index}
            className=" bg-gray-800 p-4 rounded-md mb-4 relative"
          >
            {comment.userId === user?.id ? (
              <div className="absolute right-0 top-2">
                {editingCommentId === comment.commentId ? (
                  <div className="flex gap-2 justify-end absolute right-4 top-[99px]">
                    <button
                      onClick={() => handleCancelEditComment()}
                      className="text-gray-400 hover:text-white"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => handleSaveEditedComment(comment.commentId)}
                      className="text-blue-500 hover:text-blue-300"
                    >
                      Sauvegarder
                    </button>
                  </div>
                ) : (
                  <div className="relative text-white">
                    <IoMdMore onClick={() => setShowMenu(!showMenu)} />
                    {showMenu && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 text-white z-10">
                        <div className="py-1 rounded-md shadow-xs">
                          <button
                            onClick={() => {
                              handleEditComment(comment.commentId);
                              setShowMenu(false);
                            }}
                            className="w-full text-left block px-4 py-2 text-sm text-white hover:bg-gray-700"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteComment(comment.commentId);
                              setShowMenu(false);
                            }}
                            className="w-full text-left block px-4 py-2 text-sm text-white hover:bg-gray-700"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null}
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full border-2 border-gray-600 overflow-hidden">
                {/* Afficher l'avatar de l'utilisateur */}
                {comment.avatarMode === "image" ? (
                  <Image
                    src={comment.avatar_url}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover rounded-full"
                  />
                ) : comment.avatarMode === "avatar" ? (
                  <Avatar
                    {...JSON.parse(comment.avatar_url)}
                    className="rounded-full"
                  />
                ) : null}
              </div>
              <div className="flex-grow">
                <div className="flex items-baseline justify-between gap-2">
                  {/* Afficher le nom de l'utilisateur */}
                  <h2 className="font-semibold text-lg text-white">
                    {comment.full_name}
                  </h2>
                  {/* Afficher le temps écoulé depuis la publication du commentaire */}
                  <span className="text-gray-400 text-sm">
                    {formatDistanceToNow(new Date(comment.time_posted), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </div>
                {/* Afficher le contenu du commentaire ou le champ de modification */}
                {editingCommentId === comment.commentId ? (
                  <textarea
                    value={editedComment}
                    onChange={(event) => setEditedComment(event.target.value)}
                    className="w-full p-2 rounded-md"
                    required
                  />
                ) : (
                  <p className="text-gray-400">{comment.comment}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePage;
