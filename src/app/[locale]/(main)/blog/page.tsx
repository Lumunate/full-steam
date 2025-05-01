
import ActionToday from '@/features/about/action-today/ActionToday';
import BlogMain from '@/features/blog/blog-main/BlogMain';

export const metadata = {
  title: 'FullSt3amAhead - Blog',
};

export default function About() {
  return (
    <>
      <BlogMain />
      <ActionToday />
    </>
  );
}
