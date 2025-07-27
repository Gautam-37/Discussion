;; Discussion Board with Token-Based Moderation
;; A minimal Clarity contract with two core functions

(define-fungible-token mod-token)

;; Error constants
(define-constant err-not-enough-stake (err u100))
(define-constant err-invalid-content (err u101))
(define-constant err-invalid-amount (err u102))

;; Store content as a map: post-id => (tuple content and author)
(define-map posts uint (tuple (content (string-ascii 280)) (author principal)))

;; Store votes on content: post-id => {upvotes, downvotes}
(define-map post-votes uint (tuple (upvotes uint) (downvotes uint)))

(define-data-var post-counter uint u0)

;; Submit a new post
(define-public (submit-post (content (string-ascii 280)))
  (begin
    (asserts! (> (len content) u0) err-invalid-content)
    (let ((new-id (+ (var-get post-counter) u1)))
      (map-set posts new-id { content: content, author: tx-sender })
      (map-set post-votes new-id { upvotes: u0, downvotes: u0 })
      (var-set post-counter new-id)
      (ok new-id))))

;; Stake tokens to vote on a post (positive or negative)
(define-public (vote-post (post-id uint) (is-upvote bool) (amount uint))
  (begin
    (asserts! (> amount u0) err-invalid-amount)
    (asserts! (>= (ft-get-balance mod-token tx-sender) amount) err-not-enough-stake)
    (try! (ft-burn? mod-token amount tx-sender))
    (let ((votes (default-to { upvotes: u0, downvotes: u0 } (map-get? post-votes post-id))))
      (map-set post-votes post-id
        (if is-upvote
            { upvotes: (+ (get upvotes votes) amount), downvotes: (get downvotes votes) }
            { upvotes: (get upvotes votes), downvotes: (+ (get downvotes votes) amount) }))
      (ok true))))
