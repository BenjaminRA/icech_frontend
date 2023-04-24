import Image from 'next/image';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

interface NavBarItem {
  label: string;
  href: string;
}

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);

  const navItems: NavBarItem[] = [
    {
      label: 'Inicio',
      href: '/#home',
    },
    {
      label: 'Horarios',
      href: '/#horarios',
    },
    {
      label: 'Eventos',
      href: '/#eventos',
    },
    {
      label: 'Motivos de oración',
      href: '/#motivos',
    },
    {
      label: 'Predicaciones',
      href: '/#predicaciones',
    },
    {
      label: 'Impresiones',
      href: '/#impresiones',
    },
    {
      label: 'Iglesias en Chile',
      href: '/#iglesias',
    },
    {
      label: 'Contacto',
      href: '/#contacto',
    },
  ];

  const navBarScrollAnimation = (e: Event) => {
    // get scroll position from event
    const scrollPos = window.scrollY;
    if (scrollPos < 1) {
      setShow(false);
    } else if (!show) {
      setShow(true);
    }
  };

  useEffect(() => {
    addEventListener('scroll', navBarScrollAnimation);

    return () => {
      removeEventListener('scroll', navBarScrollAnimation);
    };
  });

  return (
    <header>
      <div className="w-full fixed z-20">
        <div
          className={classNames(
            'flex justify-between items-center bg-secondary text-background transition-colors duration-200 ease-in-out',
            { 'bg-opacity-100': show || collapsed, 'bg-opacity-0': !show }
          )}
        >
          <button
            className="lg:hidden w-16 h-16"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Desktop NavBar */}
          <nav className="hidden lg:inline-flex">
            {navItems.map((item, index) => {
              return (
                <Link
                  key={`nav-item-desktop-${index}`}
                  href={item.href}
                  className="p-6 hover:text-secondary hover:bg-background block"
                >
                  {item.label.toUpperCase()}
                </Link>
              );
            })}
          </nav>

          <Link href={'/#home'}>
            <p
              className="text-sm my-auto p-3 lg:px-6"
              style={{ letterSpacing: '0.1em' }}
            >
              IGLESIA CRISTIANA <br />
              <strong>ECHAURREN 80</strong>
            </p>
          </Link>
        </div>

        {/* Mobile Dropdown */}
        <nav
          className={classNames(
            'lg:hidden absolute -z-10 w-screen -translate-y-full text-center bg-secondary transition-translate duration-200 ease-in-out text-background text-sm',
            {
              'opacity-100': show || collapsed,
              'opacity-0': !show,
              'translate-y-0': collapsed,
            }
          )}
        >
          {navItems.map((item, index) => {
            return (
              <Link
                className="p-3 hover:text-secondary hover:bg-background block"
                href={item.href}
                key={`nav-item-mobile-${index}`}
              >
                {item.label.toUpperCase()}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
