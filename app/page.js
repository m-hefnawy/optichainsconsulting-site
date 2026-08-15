import source from '../index.html?raw';

export default function Home() {
  const body = source.match(/<body>([\s\S]*?)<script src="script\.js"><\/script>[\s\S]*?<\/body>/i)?.[1] || '';

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <script src="/script.js" defer />
    </>
  );
}
