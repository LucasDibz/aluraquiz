import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import QuizBackground from '@components/QuizBackground';
import QuizContainer from '@components/QuizContainer';
import GitHubCorner from '@components/GitHubCorner';
import QuizLogo from '@components/QuizLogo';
import Button from '@components/Button';
import Widget from '@components/Widget';
import Footer from '@components/Footer';
import Input from '@components/Input';
import Link from '@components/Link';
import db from '../db.json';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial='hidden'
          animate='show'
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
            >
              <Input
                name='username'
                onChange={(event) => setName(event.target.value)}
                placeholder='Diz ai seu nome'
              />
              <Button type='submit' disabled={name.length === 0}>
                {`Jogar: ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial='hidden'
          animate='show'
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((externalLink) => {
                // const [projectName, githubUser] = externalLink
                //   .replace(/\//g, '')
                //   .replace('https:', '')
                //   .replace('.vercel.app', '')
                //   .split('.');
                const [projectName, githubUser] = new URL(
                  externalLink
                ).host.split('.');
                return (
                  <li key={externalLink}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial='hidden'
          animate='show'
        />
      </QuizContainer>
      <GitHubCorner projectUrl='https://github.com/LucasDibz' />
    </QuizBackground>
  );
}
