import React, { FormEvent } from 'react'
import { z } from 'zod'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers'
import HomePage from '../pages/HomePage'
import {
    Button,
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormLabel,
    Input,
    Select,
    Spinner,
    Stack,
  } from '@chakra-ui/react'
import GenreList from './GenreList'
import genres from '../data/genres'
import Game from '../entities/Game';
import GameHeading from './GameHeading'
import { useParams } from 'react-router-dom'
import useGame from '../hooks/useGame'
import useGenres from '../hooks/useGenres'
import usePlatforms from '../hooks/usePlatforms'
import usePublishers from '../hooks/usePublishers'

const schema = z.object ({
//   id: z.number().min(1),
//   slug: z.string().min(0),
//   background_image: string,
name: z.string().min(3),
//   genres: z.enum(genres),
//   publishers: Publisher[],
//   parent_platforms: { platform: Platform }[],
  description_raw: z.string().min(0)

  metacritic: z.number().min(0),
//   rating_top: number,
}) 

type FormData = z.infer<typeof schema>;


const GameForm =() => {

    const { data: Genre} = useGenres();
    const { data: Platform} = usePlatforms();
    const { data: Publisher} = usePublishers();

    const { register, handleSubmit } = useForm<FormData>({resolver: zodResolver(schema)});

    const onSubmit = (data: FieldValues) => console.log(data);
    // const handleSubmit = (event: FormEvent) => {
    //     event.preventDefault();
    //     console.log()
    // }

    return (
    <FormControl className='mb-3' onSubmit={handleSubmit(onSubmit)}>
  <FormLabel className='mb-3'>Game Name</FormLabel>
  <Input {...register('name')} type='text' />

  <FormLabel>Genre</FormLabel>
  <Input {...register('genre')} type='text' />

  <FormLabel>Genre</FormLabel>
  <Select placeholder='Select Genre'>
    <option></option>
    {Genre?.results.map((genre) => (
          <option key={genre.id}>{genre.name}</option>))}
  </Select>

<FormLabel>Platforms</FormLabel>
  <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
  <Stack spacing={[1, 5]} direction={['column', 'row']}>
    {Platform?.results.map((platform) => (
          <Checkbox key={platform.id}>{platform.name}</Checkbox>))}
  </Stack>
</CheckboxGroup>

  <FormLabel>Publishers</FormLabel>
  <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
  <Stack spacing={[1, 5]} direction={['column', 'row']}>
    {Publisher?.results.map((publisher) => (
          <Checkbox key={publisher.id}>{publisher.name}</Checkbox>))}
          <Checkbox>Unknown</Checkbox>
   </Stack>
</CheckboxGroup>

  <FormLabel>Description</FormLabel>
  <Input {...register('description')} type='text' />

  <FormLabel>Metacritic</FormLabel>
  <Input {...register('metacritic')} type='number' />

<Button colorScheme='green' type='submit'>Submit</Button>
    </FormControl>
 );
};

export default GameForm;