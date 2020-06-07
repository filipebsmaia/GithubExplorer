import React, { useState, useEffect, useContext, FormEvent } from 'react';
import { ThemeContext } from 'styled-components';

import { FiChevronRight, FiSearch, FiSun, FiMoon } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logo-dark.svg';

import { Title, Form, Repositories, Error, Header } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Props {
  toggleTheme(): void;
}

const Dashboard: React.FC<Props> = ({ toggleTheme }) => {
  const theme = useContext(ThemeContext);

  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@github_explorer:repositories',
    );
    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@github_explorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }
    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <Header>
        <img
          src={theme.title === 'light' ? logo : logoDark}
          alt="Github Explorer"
        />
        <button onClick={toggleTheme}>
          {theme.title === 'light' ? <FiSun size={32} /> : <FiMoon size={32} />}
        </button>
      </Header>
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">
          Pesquisar
          <FiSearch size={16} />
        </button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
