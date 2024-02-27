'use client'

import { useState, useEffect, use } from "react";
import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'

export default function Home() {
  const [timeName, setTimerName] = useState('')
  const [days, setDays] = useState<any>(0)
  const [hours, setHours] = useState<any>(0)
  const [minutes, setMinutes] = useState<any>(0)
  const [seconds, setSeconds] = useState<any>(0)
  const [timeLeft, setTimeLeft] = useState<any>(0)
  const [isRunning, setIsRunning] = useState(false);

  // Atualiza o tempo total com base nos valores dos
  // dias, horas, minutos e segundos
  useEffect(() => {
    /*days * 86400: Multiplica o número de dias pelo número de 
     segundos em um dia (24 horas * 60 minutos * 60 segundos = 86400 
      segundos por dia). Isso converte os dias em segundos.
      hours * 3600: Multiplica o número de horas pelo número de segundos 
      em uma hora (60 minutos * 60 segundos = 3600 segundos por hora). 
      Isso converte as horas em segundos.
      minutes * 60: Multiplica o número de minutos pelo número de segundos
      em um minuto (60 segundos por minuto). Isso converte os minutos em segundos.
      seconds: O número de segundos fornecidos diretamente pelo usuário. */

    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalSeconds);
  }, [days, hours, minutes, seconds])

  // Define o comportamento do cronômetro
  useEffect(() => {
    let timer: any;
    if (isRunning && timeLeft > 0) {
      // Inicia um intervalo para atualizar o tempo restante a cada segundo
      timer = setInterval(() => {
        setTimeLeft((prevTime: any) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Se o tempo restante chegar a 0, para o cronômetro
      clearInterval(timer);
      setIsRunning(false)
    }
    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(timer);
  }, [isRunning, timeLeft])

  const startTimer = () => {
    setIsRunning(true);
  }

  const resetTimer = () => {
    setTimeLeft(0);
    setIsRunning(false);
  }

  // Função para formatar o tempo em dias, horas, minutos e segundos
  const formatTime = (time: any) => {
    // Calcula o número de dias completos
    const formattedDays = Math.floor(time / 86400);
    // Calcula o número de horas restantes após subtrair os dias completos
    const formattedHours = Math.floor((time % 86400) / 3600);
    // Calcula o número de minutos restantes após subtrair as horas completas
    const formattedMinutes = Math.floor((time % 3600) / 60);
    // Calcula o número de segundos restantes após subtrair os minutos completos
    const formattedSeconds = time % 60;
    // Retorna uma string formatada representando o tempo
    return `${formattedDays}d ${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
  };
  return (
    <>
      <Container textAlign="center" maxW="md">
        <Heading as="h1" mb={4}>
          Countdown Timer
        </Heading>

        {/* Campos de entrada para o
       ** nome do cronômetro e para configurar dias,
       ** horas, minutos e segundos */}
        <Stack spacing={4} mb={4}>
        <Text fontSize="xl">Name Cronometro</Text>
          <Input
            placeholder="Timer name"
            value={timeName}
            onChange={(e) => setTimerName(e.target.value)}
          />
          <Text fontSize="xl">Days</Text>
          <Input
            type="number"
            placeholder="Days"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
          />
           <Text fontSize="xl">Hours</Text>
          <Input
            type="number"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
          />
           <Text fontSize="xl">Minutes</Text>
          <Input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
          />
           <Text fontSize="xl">Seconds</Text>
          <Input
            type="number"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
          />
        </Stack>

        {/* Exibe o tempo restante formatado */}

        <Heading as="h2" size="xl" mb={8}>
        {formatTime(timeLeft)}
        </Heading>

        {/* Botão para iniciar ou resetar o cronômetro,
          ** dependendo do estado */}

        {!isRunning ? (
          <Button colorScheme="blue" onClick={startTimer}>
            Start
          </Button>
        ) : (
          <Button colorScheme="red" onClick={resetTimer}>
            Reset
          </Button>
        )}
      </Container>
    </>
  );
}
