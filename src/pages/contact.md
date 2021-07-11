---
title: contact
hide_title: false
sections:
  - type: section_form
    section_id: contact-form
    content: >
      To get in touch, please use the form below or <a
      href="mailto:rkbroussard@prc.utexas.edu">send me an email</a>
    form_id: contactForm
    form_action: https://formspree.io/f/xnqldjnq
    form_method: POST
    form_fields:
      - type: form_field
        input_type: text
        name: name
        label: Name
        default_value: Your name
        is_required: true
      - type: form_field
        input_type: email
        name: email
        label: Email
        default_value: Your email address
        is_required: true
      - type: form_field
        input_type: text
        name: subject
        label: Subject
        default_value: Your subject
      - type: form_field
        input_type: textarea
        name: message
        label: Message
        default_value: Your message
        is_required: true
      - type: form_field
        input_type: checkbox
        name: consent
        label: I understand that this form is storing my submitted information so I can
          be contacted.
        is_required: true
    submit_label: Send Message
seo:
  type: stackbit_page_meta
  title: contact
  description: This is the contact page
  extra:
    - name: og:type
      value: website
      keyName: property
    - name: og:title
      value: Contact
      keyName: property
    - name: og:description
      value: This is the contact page
      keyName: property
    - name: twitter:card
      value: summary
    - name: twitter:title
      value: Contact
    - name: twitter:description
      value: This is the contact page
template: advanced
---
