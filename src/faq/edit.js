import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, TextControl, PanelBody, ColorPalette } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		items = [],
		accentColor = '#1d4ed8',
		backgroundColor = '#ffffff',
		borderColor = '#e5e7eb',
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'gsb-faq-block-editor',
		style: {
			'--gsb-faq-accent': accentColor,
			'--gsb-faq-bg': backgroundColor,
			'--gsb-faq-border': borderColor,
		},
	} );

	const addItem = () => {
		setAttributes( { items: [ ...items, { question: '', answer: '' } ] } );
	};

	const updateItem = ( index, field, value ) => {
		const updated = [ ...items ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { items: updated } );
	};

	const removeItem = ( index ) => {
		const filtered = items.filter( ( _, i ) => i !== index );
		setAttributes( { items: filtered } );
	};

	const colors = [
		{ name: __( 'Blue', 'gutenberg-seo-blocks' ), color: '#1d4ed8' },
		{ name: __( 'Indigo', 'gutenberg-seo-blocks' ), color: '#4338ca' },
		{ name: __( 'Green', 'gutenberg-seo-blocks' ), color: '#059669' },
		{ name: __( 'Orange', 'gutenberg-seo-blocks' ), color: '#f97316' },
		{ name: __( 'Pink', 'gutenberg-seo-blocks' ), color: '#db2777' },
		{ name: __( 'Dark', 'gutenberg-seo-blocks' ), color: '#111827' },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'FAQ Styling', 'gutenberg-seo-blocks' ) } initialOpen>
					<p>{ __( 'Accent Color', 'gutenberg-seo-blocks' ) }</p>
					<ColorPalette
						colors={ colors }
						value={ accentColor }
						onChange={ ( color ) => setAttributes( { accentColor: color || '#1d4ed8' } ) }
					/>
					<p>{ __( 'Background Color', 'gutenberg-seo-blocks' ) }</p>
					<ColorPalette
						colors={ colors }
						value={ backgroundColor }
						onChange={ ( color ) => setAttributes( { backgroundColor: color || '#ffffff' } ) }
					/>
					<p>{ __( 'Border Color', 'gutenberg-seo-blocks' ) }</p>
					<ColorPalette
						colors={ colors }
						value={ borderColor }
						onChange={ ( color ) => setAttributes( { borderColor: color || '#e5e7eb' } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<h3 className="gsb-faq-title">{ __( 'SEO FAQ Schema', 'gutenberg-seo-blocks' ) }</h3>
				{ items.length === 0 && (
					<p className="gsb-faq-note">{ __( 'Add questions and answers to build your FAQ.', 'gutenberg-seo-blocks' ) }</p>
				) }
				{ items.map( ( item, index ) => (
					<div className="gsb-faq-editor-item" key={ index }>
						<TextControl
							label={ __( 'Question', 'gutenberg-seo-blocks' ) }
							value={ item.question }
							onChange={ ( value ) => updateItem( index, 'question', value ) }
							placeholder={ __( 'Enter a question', 'gutenberg-seo-blocks' ) }
						/>
						<div className="gsb-faq-answer-field">
							<span className="gsb-faq-answer-label">{ __( 'Answer', 'gutenberg-seo-blocks' ) }</span>
							<RichText
								tagName="div"
								value={ item.answer }
								onChange={ ( value ) => updateItem( index, 'answer', value ) }
								placeholder={ __( 'Enter the answer…', 'gutenberg-seo-blocks' ) }
								allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
							/>
						</div>
						<Button
							variant="secondary"
							onClick={ () => removeItem( index ) }
							className="gsb-faq-remove"
						>
							{ __( 'Remove FAQ Item', 'gutenberg-seo-blocks' ) }
						</Button>
						<details className="gsb-faq-preview" open={ index === 0 }>
							<summary>{ item.question || __( 'Preview question', 'gutenberg-seo-blocks' ) }</summary>
							<div
								dangerouslySetInnerHTML={ {
									__html: item.answer || __( 'Preview answer', 'gutenberg-seo-blocks' ),
								} }
							/>
						</details>
					</div>
				) ) }
				<Button variant="primary" onClick={ addItem }>
					{ __( 'Add FAQ Item', 'gutenberg-seo-blocks' ) }
				</Button>
			</div>
		</>
	);
}
