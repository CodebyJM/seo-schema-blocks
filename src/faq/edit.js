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
		{ name: __( 'Blue', 'seo-schema-blocks' ), color: '#1d4ed8' },
		{ name: __( 'Indigo', 'seo-schema-blocks' ), color: '#4338ca' },
		{ name: __( 'Green', 'seo-schema-blocks' ), color: '#059669' },
		{ name: __( 'Orange', 'seo-schema-blocks' ), color: '#f97316' },
		{ name: __( 'Pink', 'seo-schema-blocks' ), color: '#db2777' },
		{ name: __( 'Dark', 'seo-schema-blocks' ), color: '#111827' },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'FAQ Styling', 'seo-schema-blocks' ) } initialOpen>
					<p>{ __( 'Accent Color', 'seo-schema-blocks' ) }</p>
					<ColorPalette
						colors={ colors }
						value={ accentColor }
						onChange={ ( color ) => setAttributes( { accentColor: color || '#1d4ed8' } ) }
					/>
					<p>{ __( 'Background Color', 'seo-schema-blocks' ) }</p>
					<ColorPalette
						colors={ colors }
						value={ backgroundColor }
						onChange={ ( color ) => setAttributes( { backgroundColor: color || '#ffffff' } ) }
					/>
					<p>{ __( 'Border Color', 'seo-schema-blocks' ) }</p>
					<ColorPalette
						colors={ colors }
						value={ borderColor }
						onChange={ ( color ) => setAttributes( { borderColor: color || '#e5e7eb' } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<h3 className="gsb-faq-title">{ __( 'SEO FAQ Schema', 'seo-schema-blocks' ) }</h3>
				{ items.length === 0 && (
					<p className="gsb-faq-note">{ __( 'Add questions and answers to build your FAQ.', 'seo-schema-blocks' ) }</p>
				) }
				{ items.map( ( item, index ) => (
					<div className="gsb-faq-editor-item" key={ index }>
						<TextControl
							label={ __( 'Question', 'seo-schema-blocks' ) }
							value={ item.question }
							onChange={ ( value ) => updateItem( index, 'question', value ) }
							placeholder={ __( 'Enter a question', 'seo-schema-blocks' ) }
						/>
						<div className="gsb-faq-answer-field">
							<span className="gsb-faq-answer-label">{ __( 'Answer', 'seo-schema-blocks' ) }</span>
							<RichText
								tagName="div"
								value={ item.answer }
								onChange={ ( value ) => updateItem( index, 'answer', value ) }
								placeholder={ __( 'Enter the answer…', 'seo-schema-blocks' ) }
								allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
							/>
						</div>
						<Button
							variant="secondary"
							onClick={ () => removeItem( index ) }
							className="gsb-faq-remove"
						>
							{ __( 'Remove FAQ Item', 'seo-schema-blocks' ) }
						</Button>
						<details className="gsb-faq-preview" open={ index === 0 }>
							<summary>{ item.question || __( 'Preview question', 'seo-schema-blocks' ) }</summary>
							<div
								dangerouslySetInnerHTML={ {
									__html: item.answer || __( 'Preview answer', 'seo-schema-blocks' ),
								} }
							/>
						</details>
					</div>
				) ) }
				<Button variant="primary" onClick={ addItem }>
					{ __( 'Add FAQ Item', 'seo-schema-blocks' ) }
				</Button>
			</div>
		</>
	);
}
