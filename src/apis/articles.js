import axios from "axios";
import { BASE_URL } from "../constant";

export async function getArticles(configs) {
  const res = await axios.get(`${BASE_URL}/articles`, configs);
  return res.data;
}

export async function getFeedArticles(configs) {
  const res = await axios.get(`${BASE_URL}/articles/feed`, configs);
  return res.data;
}

export async function getArticleBySlug(slug, configs) {
  const res = await axios.get(`${BASE_URL}/articles/${slug}`, configs);
  return res.data.article;
}

export async function getCommentsOfArticle(slug, configs) {
  const res = await axios.get(`${BASE_URL}/articles/${slug}/comments`, configs);
  return res.data.comments;
}

export async function addCommentToArticle(slug, comment, configs) {
  const res = await axios.post(
    `${BASE_URL}/articles/${slug}/comments`,
    {
      comment,
    },
    configs
  );
  return res.data.comment;
}

export async function deleteCommentOfArticle(slug, id, configs) {
  await axios.delete(`${BASE_URL}/articles/${slug}/comments/${id}`, configs);
}

export async function unfavoriteArticle(slug, configs) {
  const res = await axios.delete(
    `${BASE_URL}/articles/${slug}/favorite`,
    configs
  );
  return res.data.article;
}

export async function favoriteArticle(slug, configs) {
  const res = await axios.post(
    `${BASE_URL}/articles/${slug}/favorite`,
    {},
    configs
  );
  return res.data.article;
}

export async function createArticle(article, configs) {
  const res = await axios.post(`${BASE_URL}/articles`, { article }, configs);
  return res.data.article;
}

export async function updateArticle(article, configs) {
  const res = await axios.put(
    `${BASE_URL}/articles/${article.slug}`,
    { article },
    configs
  );
  return res.data.article;
}

export async function deleteArticle(slug, configs) {
  await axios.delete(`${BASE_URL}/articles/${slug}`, configs);
}
