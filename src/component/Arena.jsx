import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import { Row, Col, Navbar, Nav, NavDropdown, Form, FormLabel, FormControl, Button, Card } from 'react-bootstrap';
import { getGameArena } from '../redux/action'
import Spinner from './spinner'; 
import Error from './error'
import { LOADING, SUCCESS, ERROR, checkValue } from '../constants';
import EmptyImage from '../assets/images/no_data_found.png';

class Arena extends Component {
    constructor(props){
        super(props);
        this.state = {
            filter: '',
            search: '',
            sort: 'ascending',
            offset: 0,
            perPage: 100,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount(){
        this.props.getGameArena()
    }

    handleFilter(data, value) {
        this.setState({
            ...this.state[data],
            [data]: value
        })
    }

    handleReset() {
        this.setState({
            filter: '',
            search: '',
            sort: 'ascending',
        })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset,
            filter: '',
            search: '',
            sort: 'ascending',
        });
    };
    

    render() {
        const { gameArena, gameArenaStatus } = this.props;
        const { 
            filter, 
            search, 
            sort,
            currentPage
         } = this.state;

        let noFilterData = (
            <div>
                <p>No Data Found</p>
            </div>
        );
        let gamePlatformFilter = noFilterData;
        let gameCard = noFilterData;

        if (gameArenaStatus === SUCCESS) {
            const paginateGameArena = gameArena.slice(this.state.offset, this.state.offset + this.state.perPage);
            const pageCount = Math.ceil(gameArena.length / this.state.perPage);
            const gamePlatform = checkValue(paginateGameArena) ? _.uniq(paginateGameArena.map(data => data.platform)) : [];

            if (gamePlatform !== null && gamePlatform !== undefined && gamePlatform.length > 0) {
                gamePlatformFilter = (
                    <NavDropdown 
                        title="Filter By Platform" 
                        className="filter-dropdown" 
                        id="basic-nav-dropdown"
                        onSelect={(eventKey)=> this.handleFilter('filter', eventKey)}
                        activeKey={this.state.filter}
                        >
                        {gamePlatform !== null && gamePlatform.length > 0 && gamePlatform.map((data, key) => 
                            <NavDropdown.Item key={key} eventKey={data}>{data}</NavDropdown.Item>
                        )}
                    </NavDropdown>
                )
            }

            if (paginateGameArena !== null && paginateGameArena !== undefined && paginateGameArena.length > 0) {
                let filterGameCard = paginateGameArena.filter(eachData => eachData ? eachData.title.match(search) : []);
                let sortGameCard;
                if (sort === 'ascending') {
                    sortGameCard = filterGameCard.sort((a, b) => (a.score - b.score))
                }
                else if (sort === 'descending') {
                    sortGameCard = filterGameCard.sort((a, b) => (b.score - a.score))
                }
                else {
                    sortGameCard = filterGameCard
                }

                let filterGameArena = sortGameCard.filter(eachData => eachData ? eachData.platform.match(filter): [])
                
                gameCard = (
                    <>
                        <Row>
                            {filterGameArena.length > 0 && filterGameArena.map((data, key) => 
                                <Col xl={3} lg={3} md={4} sm={6} xs={12} key={key}>
                                    <div className="game-card">
                                        <Card key={key}>
                                            <Card.Body>
                                                <Card.Title>{data.title}</Card.Title>
                                                <div className="items">
                                                    <i className="fa fa-home" aria-hidden="true"></i>
                                                    <label>Genre:-</label>
                                                    <span>{data.genre}</span>
                                                </div>
                                                <div className="items">
                                                    <i className="fa fa-desktop" aria-hidden="true"></i>
                                                    <label>Platform:-</label>
                                                    <span>{data.platform}</span>
                                                </div>
                                                <div className="items">
                                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                                    <label>Release Year:-</label>
                                                    <span>{data.release_year}</span>
                                                </div>
                                                <div className="game-content">
                                                    <ul>
                                                        <li>
                                                            <label>Score:-</label>
                                                            <span>{data.score}</span>
                                                        </li>
                                                        <li>
                                                            <label>Choice:-</label>
                                                            <span>{data.editors_choice === 'Y' ? 'Yes' : data.editors_choice === 'N' ? 'No' : ''}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="items">
                                                    <Card.Link href={data.url} target="_blank">Goto Link</Card.Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </Col>
                            )}
                            {filterGameArena.length === 0 &&
                                <Col>
                                    <div className="empty-cntainer">
                                        <img src={EmptyImage} alt=''/>
                                    </div>
                                </Col>
                            }
                        </Row>
                    </>
                )
            }
        }

        return(
            <div className="body-color">
                { gameArenaStatus === LOADING ? 
                        <Spinner/>
                    : gameArenaStatus === SUCCESS ? 
                    <div>
                        {/* header-section */}
                        <header>
                            <Navbar expand="sm" sticky="top" variant="dark" className="navbar-header">
                                <Navbar.Brand href="#">Sapient Game Arena</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ml-auto" >
                                        {gamePlatformFilter}
                                    </Nav>
                                    <Form inline>
                                        <FormLabel className="sorting-heading form-continer">Sort By Score</FormLabel>
                                        <FormControl as="select" className="form-continer" custom value={this.state.sort} onChange={(event)=> this.handleFilter('sort', event.target.value)}>
                                            <option value="ascending">Ascending</option>
                                            <option value="descending">Descending</option>
                                        </FormControl>
                                        <FormControl 
                                            type="text" 
                                            className="form-continer" 
                                            eventKey="search" 
                                            onChange={(event)=> this.handleFilter('search', event.target.value)} 
                                            placeholder="Search Game Name" 
                                            autoComplete="on"
                                            value={search}
                                        />
                                        <Button type="reset" onClick={()=> this.handleReset()} className="form-continer">Reset</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Navbar>
                        </header>
                        {/* header-section */}

                        {/* body-section */}
                        <div className="container-body vertical_scroll">
                            <div>
                                {gameCard}
                            </div>
                        </div>
                        {/* body-section */}

                        {/* footer-section */}
                        <footer>
                            <div className="footer">
                                <ReactPaginate
                                    previousLabel={"Prev"}
                                    nextLabel={"Next"}
                                    breakLabel={<span className="gap">...</span>}
                                    pageCount={this.pageCount}
                                    onPageChange={this.handlePageClick}
                                    forcePage={currentPage}
                                    containerClassName={"pagination"}
                                    previousLinkClassName={"previous_page"}
                                    nextLinkClassName={"next_page"}
                                    disabledClassName={"disabled"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </footer>
                        {/* footer-section */}

                    </div>
                    : gameArenaStatus === ERROR ? 
                        <Error/>
                    : ''
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    getGameArena
};

function mapStateToProps(state){
    const { 
        gameArena, 
        gameArenaStatus
    } = state.gameArenaState;
    return {
        gameArena, 
        gameArenaStatus
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Arena);
        