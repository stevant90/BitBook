import React, { Component } from 'react';
import { Grid, Row, Col, Button, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Modal from 'react-modal';
import InfiniteScroll from 'react-infinite-scroll-component';

import { dataService } from '../../Service/dataService';
import NewPostsPage from './newPostsPage';
import { TextPostsComponent } from './textPostsComponent';
import ImagePostsComponent from './imagePostsComponent';
import { VideoPostsComponent } from './videoPostsComponent';
import FilterPosts from '../../Common/filterPosts';

export default class NewsFeedPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			type: '',
			postsCount: 0,
			newTop: 5,
			imagePreviewModalIsOpen: false,
			hasMore: true,
			display: 'none',
		};
	}

	openModal = () => {
		this.setState({ imagePreviewModalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ imagePreviewModalIsOpen: false });
	};

	loadPostsForInfiniteScroll = () => {
		dataService.getPostsForInfiniteScroll(this.state.newTop + 5, posts => {
			this.setState({
				posts,
				newTop: this.state.newTop + 5,
			});
		});

		if (this.state.posts.length === this.state.postsCount) {
			this.setState({ hasMore: false });
		}
	};

	loadData = () => {
		dataService.getPostsForInfiniteScroll(5, posts => this.setState({ posts }));

		dataService.getPostsCount(response => this.setState({ postsCount: response.data }));
	};

	componentDidMount() {
		this.loadData();
	}

	filterPosts = searchTerm => {
		this.setState({ type: searchTerm });
	};

	deletePost = id => {
		dataService.deletePost(id, response => {
			this.loadData();
		});
	};

	backToTop = () => {
		this.setState({ display: 'none' });

		if (window.scrollY > 100) {
			this.setState({ display: 'block' });
		}
	};

	render() {
		const { posts } = this.state;

		const tooltip = <Tooltip id="tooltip">Back to top</Tooltip>;

		return (
			<Grid>
				<Row>
					<Col sm={4}>
						<NewPostsPage reloadPage={this.loadData} />
					</Col>
					<Col sm={4} smOffset={4}>
						<FilterPosts onSelect={this.filterPosts} />
					</Col>
				</Row>
				<Row>
					<Col>
						{posts.map(post => {
							if (this.state.type !== '') {
								if (post.type === 'text' && this.state.type === 'text') {
									return <TextPostsComponent post={post} key={post.id} />;
								} else if (post.type === 'image' && this.state.type === 'image') {
									return <ImagePostsComponent post={post} key={post.id} open={this.openModal} />;
								} else if (post.type === 'video' && this.state.type === 'video') {
									return <VideoPostsComponent post={post} key={post.id} />;
								}
							} else {
								if (post.type === 'text') {
									return <TextPostsComponent post={post} key={post.id} />;
								} else if (post.type === 'image') {
									return <ImagePostsComponent post={post} key={post.id} />;
								} else if (post.type === 'video') {
									return <VideoPostsComponent post={post} key={post.id} />;
								}
							}
						})}

						<OverlayTrigger placement="top" overlay={tooltip}>
							<a href="#" style={{ display: this.state.display }} className="back-to-top">
								<Glyphicon glyph="chevron-up" />
							</a>
						</OverlayTrigger>

						<InfiniteScroll
							dataLength={this.state.posts.length}
							refreshFunction={this.refresh}
							next={this.loadPostsForInfiniteScroll}
							hasMore={this.state.hasMore}
							onScroll={this.backToTop}
						/>
					</Col>
				</Row>
			</Grid>
		);
	}
}
