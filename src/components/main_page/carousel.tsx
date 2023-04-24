import classNames from 'classnames';
import Image from 'next/image';
import 'react';
import { useState } from 'react';

interface CarouselProps {
  id?: string;
}

interface CarouselPage {
  url: string;
  content: string;
}

export default function Carousel({ id }: CarouselProps) {
  const [pages, setPages] = useState<CarouselPage[]>([
    {
      url: 'https://z-p3-scontent.fscl19-1.fna.fbcdn.net/v/t39.30808-6/342712056_144802418536496_1344033922700685170_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFl7JAekudq167auVKAAY5-I-21HFZOwjsj7bUcVk7CO4n6a3DxzCBu5oOuNzlxoos&_nc_ohc=QBj29cwV3DYAX_kpNCk&_nc_zt=23&_nc_ht=z-p3-scontent.fscl19-1.fna&oh=00_AfAsTTfLqPbtUMDrkOxvNJwwvDl6TSgF_9l391bwzWevgA&oe=6449B150',
      content: '',
    },
    {
      url: 'https://i.stack.imgur.com/rx37R.png',
      content: '',
    },
    {
      url: 'https://z-p3-scontent.fscl19-1.fna.fbcdn.net/v/t39.30808-6/342337122_897302911500765_517355084347326273_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeER9bzGebO6Y_tKonjgbPF752lVMLGZeUnnaVUwsZl5SfAPzXjKoP-2BhMXbq5n0ws&_nc_ohc=S9y-yM0U-EMAX-7uuqk&_nc_oc=AQkQS3RfuEr6s37Qej60aGDBHn6skM-B4MLZcd72qyJeL_UOm2LSJ1rFZ2OSN7XxFEw&_nc_zt=23&_nc_ht=z-p3-scontent.fscl19-1.fna&oh=00_AfDLU56SQDoUuBII3GZYxWzXwi8299FCDk1nFXu2X8yQnw&oe=644A8098',
      content: '',
    },
    {
      url: 'https://z-p3-scontent.fscl19-1.fna.fbcdn.net/v/t39.30808-6/342686726_254630443671386_7833864093391343386_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeG4j3UA9xDsC3ZrHd_b8tWAPL2r9NrxbHg8vav02vFseMAXIYigrpurUrs1iYU2AE0&_nc_ohc=x1IlEgfAApoAX8xVZoV&_nc_zt=23&_nc_ht=z-p3-scontent.fscl19-1.fna&oh=00_AfCpdQqD16vscWQH18K8-I5tG1wxgsslURjYLKO0UZ-_vA&oe=6449DDD3',
      content: '',
    },
  ]);

  const [selected, setSelected] = useState(0);

  const handleLeftButton = () => {
    if (selected > 0) {
      setSelected(selected - 1);
    }
  };

  const handleRightButton = () => {
    if (selected < pages.length - 1) {
      setSelected(selected + 1);
    }
  };

  return (
    <section
      id={id}
      className="overflow-x-hidden"
    >
      <div className="relative">
        {selected < pages.length && (
          <img
            className="invisible max-full"
            src={pages[selected].url}
            style={{
              maxHeight: '100vh',
            }}
          />
        )}

        {pages.map((page, index) => {
          return (
            <div
              key={`carousel-page-${index}`}
              className="w-full absolute top-0 left-0 z-0 transition-transform duration-500 ease-in-out h-full"
              style={{
                transform: `translate(calc(100vw * ${index - selected}), 0)`,
                backgroundImage: `url(${page.url})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            ></div>
          );
        })}

        {/* Overlay */}
        <div className="absolute top-0 z-10 w-screen h-full">
          <div className="bg-black opacity-60 w-screen h-full" />

          {/* Arrows */}
          <div className="absolute z-10 flex w-full h-full left-0 top-1/2 transform -translate-y-1/2 justify-between text-primary">
            <button
              disabled={selected == 0}
              onClick={handleLeftButton}
              className="disabled:text-secondary disabled:opacity-50 px-6 lg:px-8 h-full bg-black bg-opacity-20 group"
            >
              <i
                className={classNames('fas fa-chevron-left text-4xl', {
                  'group-hover:animate-left-arrow': selected != 0,
                })}
              ></i>
            </button>
            <button
              disabled={selected == pages.length - 1}
              onClick={handleRightButton}
              className="disabled:text-secondary disabled:opacity-50 px-6 lg:px-8 bg-black bg-opacity-20 group"
            >
              <i
                className={classNames('fas fa-chevron-right text-4xl', {
                  'group-hover:animate-right-arrow':
                    selected != pages.length - 1,
                })}
              ></i>
            </button>
          </div>

          {/* Bottom Page Buttons */}
          <div className="absolute bottom-0 z-30 flex justify-center py-4 space-x-2 left-1/2 transform -translate-x-1/2">
            {pages.map((_, index) => {
              return (
                <button
                  key={`carousel-page-${index}-button`}
                  className={classNames(
                    'border-black border-2 rounded-full h-4 w-4 hover:bg-secondary transition-colors ease-in-out duration-100',
                    {
                      'bg-background': selected != index,
                      'bg-primary': selected == index,
                    }
                  )}
                  onClick={() => {
                    setSelected(index);
                  }}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
