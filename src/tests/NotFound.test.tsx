import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.tsx />', () => {
  it('A página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<App />, { route: '/notfound' });
    const notFoundMessage = screen.getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(notFoundMessage).toBeInTheDocument();
  });
  
  it('A página mostra a imagem com um texto alternativo', () => {
    renderWithRouter(<App />, { route: '/notfound' });
    const notFoundImage = screen.getByRole('img') as HTMLImageElement;
    expect(notFoundImage.src).toBe('http://localhost:3000/404.gif')
  })
});
