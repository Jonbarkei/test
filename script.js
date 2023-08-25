class App extends React.Component {
	constructor() {
		super()
		this.state = {
			data: [],
			activeID: 0,
			imageView: false
		}
	}
	componentWillMount() {
		this._loadData('https://s3-us-west-2.amazonaws.com/s.cdpn.io/735173/rpg-2-data.json')
	}
	componentWillUnmount() {
			this._loadData.abort()
		}
		// Fetch data, then clone it to state using destructuring
		// XHR Fallback
	_loadData(url) {
		fetch(url, {
				method: 'GET'
			})
			.then(response => response.json())
			.then(json => this.setState({
				data: [...json.gallery]
			}))
			.catch((err) => {
				console.log(err.message)
				try {
					const xhr = new XMLHttpRequest()
					xhr.open('GET', url)
					xhr.responseType = 'json'

					xhr.onload = () => {
						let json = xhr.response
						this.setState({
							data: [...json.gallery]
						})
					}

					xhr.onerror = () => {
						throw new Error('XMLHttpRequest Failed...')
					}

					xhr.send()
				} catch (e) {
					console.log(e.message)
				}
			})
	}
	_openImageView(id) {
		this.setState({
			activeID: id,
			imageView: true
		});
	}
	_closeImageView() {
		this.setState({
			imageView: false
		})
	}
	render() {
		return (
			<div className="wrapper">
				{
					this.state.imageView ? 
					<ImageView {...this.state.data[this.state.activeID]}
						_closeImageView={this._closeImageView.bind(this)} />
						:
					<Gallery data={this.state.data}
						_openImageView={this._openImageView.bind(this)} />
				}
			</div>
		)
	}
}

class ImageView extends React.Component {
	render() {
		return (
			<div className="imageview-wrapper fadeIn">
				<div className="imageview">
					<Image CSSClass="imageview-image"
						src={this.props.src}
						alt={this.props.name} />
					<div className="imageview-info">
						<button className="imageview-close" onClick={this.props._closeImageView}>x</button>
						<h2>{this.props.name}</h2>
						<p>{this.props.desc}</p>
						<h3>Tags</h3>
						<ul>
							{this.props.tags.map(tag => <li>{tag}</li>)}
						</ul>
					</div>
			</div>
		</div>
		)
	}
}

class Gallery extends React.Component {
	render() {
		return (
			<div className="gallery fadeIn">
			{
				this.props.data.map( data => 
					<Tile key={data.id}
						id={data.id}
						src={data.src}				
						name={data.name}
						desc={data.desc}
						_openImageView={this.props._openImageView} />
				)
			}
	</div>
		)
	}
}

class Tile extends React.Component {
	_handleClick() {
		this.props._openImageView(this.props.id)
	}
	render() {
		return (
			<div className="gallery-tile" onClick={this._handleClick.bind(this)}>
			<div className="picture-info">
				<h2>{this.props.name}</h2>
				{/*<p>{this.props.desc}</p>*/}
			</div>
			<Image
				CSSClass="tile-image"
				src={this.props.src} 
				alt={this.props.name} />
		</div>
		)
	}
}

const Image = (props) => (
	<img
		className={props.CSSClass}
		src={props.src} 
		alt={props.name} />
)

// Render app
ReactDOM.render(<App />, document.getElementById('app'))
