import empty from '../../assets/empty.png'
import st from './Empty.module.scss'

export default function Empty() {
	return (
		<div className={st.root}>
			<img src={empty} />
			<p>Empty...</p>
		</div>
	)
}
