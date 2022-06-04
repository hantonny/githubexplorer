interface RepositoryItemProps {
    repository: {
        name: string,
        description: string,
        html_url: string,
    }
}

export function RepositoryItem(props: RepositoryItemProps) {
    return (
        <div>
        <li className="item">
            <strong>{props.repository.name}</strong>
            <p>{props.repository.description}</p>

            <a href={props.repository.html_url} target="_blank">
                Acessar repositórios
            </a>
        </li >
        </div>
    )
}