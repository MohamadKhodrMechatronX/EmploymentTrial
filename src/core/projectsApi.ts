import { api } from "./http";
import { endpoints } from "./config";

export async function getProjects(params?: { limit?: number; offset?: number }) {
  const url = (endpoints as any).projects ? (endpoints as any).projects() : "/api/v2/projects";
  return api.get(url, { params }).then(r => r.data);
}

export async function getProject(projectId: string | number) {
  return api.get(endpoints.project(projectId)).then(r => r.data);
}

export async function updateProject(
  projectId: string | number,
  payload: { name?: string; description?: string }
) {
  return api.put(endpoints.project(projectId), payload).then(r => r.data);
}

export async function getProjectSongs(
  projectId: string | number,
  params?: { page?: number; limit?: number }
) {
  return api.get(endpoints.projectSongs(projectId), { params }).then(r => r.data);
}

export async function deleteProjectSong(
  projectId: string | number,
  payload: { song_id: string | number }
) {
  return api.delete(endpoints.projectSongs(projectId), { data: payload }).then(r => r.data);
}

export async function getProjectPickups(projectId: string | number) {
  return api.get(endpoints.projectPickups(projectId)).then(r => r.data);
}