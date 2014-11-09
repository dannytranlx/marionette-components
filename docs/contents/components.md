---
title: Components
slug: components
template: doc.html
changefreq: daily
priority: 0.9
---

# Modals
The styling and markup is up to you. In this case, we will use Bootstrap's styling.

## Examples
Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.

<div class="bs-callout bs-callout-warning" id="callout-stacked-modals">
    <h4>Overlapping modals not supported</h4>
    <p>Be sure not to open a modal while another is still visible. Showing more than one modal at a time requires custom code.</p>
</div>
<div class="bs-callout bs-callout-warning" id="callout-modal-markup-placement">
    <h4>Modal markup placement</h4>
    <p>Always try to place a modal's HTML code in a top-level position in your document to avoid other components affecting the modal's appearance and/or functionality.</p>
</div>

### Static example
A rendered modal with header, body, and set of actions in the footer.

<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
        </div>
        <div class="modal-body">
        ...
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    </div>
</div>

```javascript
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
        </div>
        <div class="modal-body">
        ...
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    </div>
</div>
```