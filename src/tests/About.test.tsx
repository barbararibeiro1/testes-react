import { screen  } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <About.tsx />', () => {
  it('A página contém informações sobre a Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const titleElement = screen.getByRole('heading', { name: /about pokédex/i })
    expect(titleElement).toBeInTheDocument();
  });
  
  it('A página contém um headline h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const textAbout = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(textAbout).toBeInTheDocument();
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const paragraphFirst = screen.getByText(/This application simulates a Pokédex/i)
    expect(paragraphFirst).toBeInTheDocument;

    const paragraphSecond = screen.getByText(/One can filter Pokémon by type/i)
    expect (paragraphSecond).toBeInTheDocument;
  });

  it('A página contém uma imagem específica de uma pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutImage = screen.getByRole('img') as HTMLImageElement;
    expect(aboutImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
