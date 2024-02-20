import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, MemoryRouter, Route, Routes } from "react-router-dom";
import App from "../App"
import userEvent from "@testing-library/user-event";
import renderWithRouter from "../renderWithRouter";

test('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  //Verifica se o primeiro link tem o texto home
  const homeLink = screen.getByRole('link', { name: /home/i });
  expect(homeLink).toBeInTheDocument();
  //verifica se o segundo link tem o texto about
  const aboutLink = screen.getByRole('link', { name: /about/i });
  expect(aboutLink).toBeInTheDocument();
  //verifica se o terceiro link tem o texto favorite Pokemon
  const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
  expect(favoritePokemonLink).toBeInTheDocument();
});

test('Verifica se a aplicação é redirecionada para a página inical, na url /, ao clicar no link home da barra de navegação', async () => {
  const { user } = renderWithRouter(<App />);
  const mainTitle = screen.queryByRole('heading', { name: /pokédex/i })
  expect(mainTitle).toBeInTheDocument();

   const homeLink = screen.getByRole('link', { name: /home/i });
   userEvent.click(homeLink);
   const secondTitle = await screen.findByRole('heading', { name: /encountered pokémon/i })
   expect(secondTitle).toBeInTheDocument();
 
});

test('Verifica se a aplicação é redirecionada para a página about ao clicar no link about da barra de navegação', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
      <Routes>
        <Route path="/about">About</Route>
      </Routes>
    </MemoryRouter>
    );

  const aboutLink = screen.getByRole('link', { name: /about/i });
   userEvent.click(aboutLink);
   expect(screen.getByText('About')).toBeInTheDocument();
 
});

test('Verifica se a aplicação é redirecionada para a página de favoritados ao clicar no link favorite pokemon da barra de navegação', async () => {
  const { user } = renderWithRouter(<App />)
  const mainTitle = screen.queryByRole('heading', { name: /pokédex/i })
  expect(mainTitle).toBeInTheDocument();

  const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
  await userEvent.click(favoritePokemonLink);
  const secondTitle = screen.getByRole('heading', { name: /favorite pokémon/i })
  expect(secondTitle).toBeInTheDocument();
 
});

test('Verifica se a aplicação é redirecionada para a página not found ao entrar em uma url desconhecida', () => {
  render(
    <MemoryRouter initialEntries={['/unknown-route']}>
      <App />
      <Routes>
        <Route path="*"element={<div>Página Not Found</div>} />
      </Routes>
    </MemoryRouter>
    );
  const notFoundMessage = screen.getByRole('heading', { name: /page requested not found/i })
  expect(notFoundMessage).toBeInTheDocument();
 
});