import { AppContentWrapper } from '@/components/common/Global.style';
import SectionMainHeading from '@/components/section-main-heading/SectionMainHeading';
import { BlogImageRel, BlogMainContainer } from '@/features/blog/blog-main/BlogMain.style';
import {
  MainTimeDetailsContainer,
  MainBLogTimeDetailsText,
  MainBlogCategoryText,
  MainBlogDetailsContainer,
  MainBlogHeading,
  BlogMainCard,
  MainBlogImage,
  ImageOverlay,
  BlogSubContainer,
  CategoryDot,
  BlogSubCard,
  BlogSubImage,
  BlogImageContainer
} from '@/features/blog/blog-main/BlogMain.style';
import SectionHeading from '@/features/components/section-heading/SectionHeading';
import { SectionDescriptionText } from '@/features/home/Home.style';
import { ServiceWrapper } from '@/features/home/what-we-offer/ServicesWrapper.style';

const blogMain = [
  {
    heading:
      'Gone are the days of scrambling to find last-minute help or struggling to balance your responsibilities. ',
    category: 'HealthCare',
    date: 'Oct 19',
    timeRead: '10 min read',
    backgroundImg: '/blog/blog-main.png',
  },
  {
    heading:
      'Gone are the days of scrambling to find last-minute help or struggling to balance your responsibilities. ',
    category: 'HealthCare',
    date: 'Oct 19',
    timeRead: '10 min read',
    backgroundImg: '/blog/blog-main.png',
  },
];

const subBlogs = [
  {
    heading:
      'Gone are the days of scrambling to find last-minute help or struggling to balance your responsibilities. ',
    category: 'HealthCare',
    date: 'Oct 19',
    timeRead: '10 min read',
    imgSrc: '/blog/blog-sub.png',
  },
  {
    heading:
      'Gone are the days of scrambling to find last-minute help or struggling to balance your responsibilities. ',
    category: 'HealthCare',
    date: 'Oct 19',
    timeRead: '10 min read',
    imgSrc: '/blog/blog-sub.png',
  },
  {
    heading:
      'Gone are the days of scrambling to find last-minute help or struggling to balance your responsibilities. ',
    category: 'HealthCare',
    date: 'Oct 19',
    timeRead: '10 min read',
    imgSrc: '/blog/blog-sub.png',
  },
  {
    heading:
      'Gone are the days of scrambling to find last-minute help or struggling to balance your responsibilities. ',
    category: 'HealthCare',
    date: 'Oct 19',
    timeRead: '10 min read',
    imgSrc: '/blog/blog-sub.png',
  },
];
const BlogMain: React.FC = () => {
  return (
    <>
      <AppContentWrapper>
        <ServiceWrapper>
          <SectionHeading text='Our Blog' align='start' marginBottom='23px' />
          <SectionMainHeading text='Resources and Insights'  />
          <SectionDescriptionText fontSize='18px'>
            The latest insights, news, resources.
            <BlogImageRel src='/about/how-it-is-section/notification.png' alt='icon' height={217} width={195} />
          </SectionDescriptionText>
          <BlogMainContainer>
            {blogMain.map((blog, index) => (
              <BlogMainCard key={index}>
                <MainBlogImage
                  src={blog.backgroundImg}
                  alt={blog.heading}
                  height={472}
                  width={788}
                />
                <ImageOverlay />
                <MainBlogDetailsContainer>
                  <MainBlogCategoryText>
                    <CategoryDot />
                    {blog.category}</MainBlogCategoryText>
                  <MainBlogHeading >{blog.heading}</MainBlogHeading>

                  <MainTimeDetailsContainer>
                    <MainBLogTimeDetailsText >
                      {blog.date}
                    </MainBLogTimeDetailsText>
                    <MainBLogTimeDetailsText >•</MainBLogTimeDetailsText>
                    <MainBLogTimeDetailsText 
                    >
                      {blog.timeRead}
                    </MainBLogTimeDetailsText>
                  </MainTimeDetailsContainer>
                </MainBlogDetailsContainer>
              </BlogMainCard>
            ))}
          </BlogMainContainer>
          <BlogSubContainer>
            {subBlogs.map((blog, index) => (
              <BlogSubCard key={index}>
                <BlogImageContainer>

                  <BlogSubImage
                    src={blog.imgSrc}
                    alt={blog.heading}
                    height={160}
                    width={362}
                  />
                  <ImageOverlay />
                </BlogImageContainer>
                
                <MainBlogDetailsContainer noPad={true} noBlur={true} pos={true}>
                  <MainBlogCategoryText  noBack={true}>
                    <CategoryDot />
                    {blog.category}</MainBlogCategoryText>
                  <MainBlogHeading color='#1B1B1F' fontSize='18px' >{blog.heading}</MainBlogHeading>

                  <MainTimeDetailsContainer>
                    <MainBLogTimeDetailsText color='#1B1B1F'>
                      {blog.date}
                    </MainBLogTimeDetailsText>
                    <MainBLogTimeDetailsText color='#1B1B1F' >•</MainBLogTimeDetailsText>
                    <MainBLogTimeDetailsText color='#1B1B1F' 
                    >
                      {blog.timeRead}
                    </MainBLogTimeDetailsText>
                  </MainTimeDetailsContainer>
                </MainBlogDetailsContainer>
              </BlogSubCard>
            ))}
          </BlogSubContainer>
        </ServiceWrapper>
      </AppContentWrapper>
    </>
  );
};

export default BlogMain;
