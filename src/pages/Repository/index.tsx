import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { useRouteMatch, Link } from 'react-router-dom';
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiGitBranch,
  FiInfo,
} from 'react-icons/fi';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logo-dark.svg';

import { Header, RepositoryInfo, Issues, IssuesLabel } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
  labels: IssueLabel[];
}

interface IssueLabel {
  id: number;
  color: string;
  description: string;
}

const Repository: React.FC = () => {
  const theme = useContext(ThemeContext);
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });
    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <Header>
        <img
          src={theme.title === 'light' ? logo : logoDark}
          alt="Github Explorer"
        />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>
                <FiStar size={16} /> Stars
              </span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>
                <FiGitBranch size={16} /> Forks
              </span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>
                <FiInfo size={16} /> Issues abertas
              </span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>

              {issue.labels.map((label) => (
                <IssuesLabel color={`#${label.color}`}>
                  {label.description}
                </IssuesLabel>
              ))}
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
