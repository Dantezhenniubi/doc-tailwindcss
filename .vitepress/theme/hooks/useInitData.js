import { data } from '../data/posts.data';
import { setPosts } from '../store/posts';

export function useInitData() {
  setPosts(data);
}
