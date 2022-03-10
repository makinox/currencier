import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

export default function BlogsSkeleton({ props }: { props?: IContentLoaderProps }) {
  const width = 300;
  const height = 400;

  return (
    <ContentLoader width={width} height={height} viewBox={`0 0 ${width} ${height}`} {...props}>
      <rect x="0" y="240" rx="4" ry="4" width="280" height="65" />
      <rect x="0" y="323" rx="3" ry="3" width="280" height="60" />
      <rect x="0" y="15" rx="10" ry="10" width="280" height="200" />
    </ContentLoader>
  );
}
