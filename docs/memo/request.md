## requestで取得できる値
```
async create(
    createCommentDto: CreateReviewDto,
    request: Request,
): Promise<Review> {
    console.log(request.get('User-Agent'));
    console.log(request.get('set-cookie'));
    console.log(request.ip);
    return await this.commentRepository.create(createCommentDto);
}
```
