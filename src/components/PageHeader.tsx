import './PageHeader.css'
interface PageHeaderProps {
    titulo: string;
}

function PageHeader(props: PageHeaderProps) {
    return (
        <header id="page-header">
            <div className="container">
                <h1>{props.titulo}</h1>
            </div>
        </header>
    )
}

export default PageHeader