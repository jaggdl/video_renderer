import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT_FAMILY} from './constants';

const title: React.CSSProperties = {
	fontFamily: FONT_FAMILY,
	fontWeight: 'bold',
	fontSize: 72,
	textAlign: 'center',
	width: '100%',
	padding: '12px',
};

const container: React.CSSProperties = {
	position: 'absolute',
	bottom: '50%',
	transform: 'translateY(50%)',
	width: '100%',
	background: 'rgba(255, 255, 255, 0.3)',
	// backdropFilter: 'blur(24px)',
	boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
};



const word: React.CSSProperties = {
	marginLeft: 10,
	marginRight: 10,
	display: 'inline-block',
};

export const Title: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const words = titleText.split(' ');

	return (
		<div style={container}>
			<h1 style={title}>
				{words.map((t, i) => {
					const delay = i * 5;

					const scale = spring({
						fps: videoConfig.fps,
						frame: frame - delay,
						config: {
							damping: 200,
						},
					});

					return (
						<span
							key={t}
							style={{
								...word,
								color: titleColor,
								transform: `scale(${scale})`,
							}}
						>
							{t}
						</span>
					);
				})}
			</h1>
		</div>
	);
};
