import http from "../http-common";
class DataService {
  getAll() {
    return http.get("/llista");
  }
  get(id) {
    return http.get(`/llista/${id}`);
  }
  create(data) {
    return http.post("/llista", data);
  }
  update(id, data) {
    return http.put(`/llista/${id}`, data);
  }
  delete(id) {
    return http.delete(`/llista/${id}`);
  }
  deleteAll() {
    return http.delete(`/llista`);
  }
  findByTitle(title) {
    return http.get(`/llista?title=${title}`);
  }
}
export default new DataService();