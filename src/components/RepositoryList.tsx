import { useState, useEffect } from 'react'
import { RepositoryItem } from "./RepositoryItem"
import Slider from "react-slick";

import '../styles/repositories.scss'

//https://api.github.com/users/hantonny/repos

interface Repository {
    name: string,
    description: string,
    html_url: string,
}

interface Users {
    name: string,
    blog: string,
}


export function RepositoryList() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };
    const [repositories, setRepositories] = useState<Repository[]>([])
    const [users, setUsers] = useState<Users>({ name: '', blog: '' })

    useEffect(() => {
        fetch('https://api.github.com/users/hantonny/repos')
            .then(response => response.json())
            .then(data => setRepositories(data))

    }, [])

    useEffect(() => {
        fetch('https://api.github.com/users/hantonny')
            .then(response => response.json())
            .then(data => setUsers(data))
    }, [])

    return (
        <section className="repository-list">
            <h1>Lista de Repositórios de <a href={users.blog} target="_blank">{users.name}</a></h1>
            <ul>
                <Slider {...settings}>
                    {repositories.map(repository => {
                        return <RepositoryItem key={repository.name} repository={repository} />
                    })}
                </Slider>

            </ul>



        </section>

    )
}