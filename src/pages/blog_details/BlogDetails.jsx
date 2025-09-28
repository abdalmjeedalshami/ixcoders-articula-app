import { useState } from "react";
import { Container, Row, Col, Badge, Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router";
import { useTags } from "../../utils/TagContext";
import colors from "../../theme/colors";
import "./BlogDetails.css";
import MySpinner from "../../components/common/mySpinner/MySpinner";
import def_blog_image from "../../../public/images/def_blog_image.jpg";
import EditBlogModal from "../../models/EditBlogModal";

const BlogDetails = ({ data, fetchData }) => {
  const { tags, loading } = useTags();
  const [showEdit, setShowEdit] = useState(false);

  // if (loading) return <MySpinner />;
  console.log(tags);
  console.log(data);

  if (!data) return <MySpinner />;

  const title = data.title?.[0]?.value || "";
  const body = data.body?.[0]?.processed || "";
  const banner = data.field_image?.[0]?.url || "";
  const gallery = data.field_gallery || [];
  const blog_tags = data.field_tags || [];
  const created = new Date(data.created?.[0]?.value).toLocaleDateString();

  return (
    <Container className="mt-5">
      <EditBlogModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        blog={data}
        onUpdated={(updated) => {
          console.log("Blog updated:", updated);
          fetchData();
        }}
      />
      {/* Banner */}
      {banner || def_blog_image ? (
        <Row className="mb-4">
          <Col>
            <div
              className="rounded-0 overflow-hidden shadow-sm"
              style={{ maxHeight: "500px" }}
            >
              <Image
                src={banner || def_blog_image}
                alt={data?.field_image?.[0]?.alt || "Banner image"}
                fluid
                className="w-100 h-100 object-fit-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src = def_blog_image;
                }}
              />
            </div>
          </Col>
        </Row>
      ) : null}

      {/* Title + Meta */}
      <Row className="mb-4">
        <Col>
          <Row>
            <Col>
              <h1 className="fw-bold">{title || "Untitled"}</h1>
            </Col>
            <Col className="d-flex justify-content-end py-1">
              <button
                onClick={() => {
                  setShowEdit(true);
                }}
              >
                Edit
              </button>
            </Col>
          </Row>

          {created && <p className="text-muted">🗓 Published: {created}</p>}

          <div className="d-flex flex-wrap gap-2">
            {blog_tags?.length > 0 &&
              blog_tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/tag/${
                    tags?.[blog_tags[index].target_id - 1]?.name || ""
                  }`}
                >
                  <Badge
                    key={tags?.[index]?.id || index}
                    className="my-badge px-3 py-2 rounded-0 me-2 mb-2"
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      backgroundColor: colors.primary,
                      color: "#fff",
                      border: "none",
                    }}
                    onClick={() =>
                      tags?.[index]?.id && handleTagClick(tags[index].id)
                    }
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    #{tags?.[blog_tags[index].target_id - 1]?.name || "tag"}
                    {/* #{tags?.[index]?.name || "tag"} */}
                  </Badge>
                </Link>
              ))}
          </div>
        </Col>
      </Row>

      {/* Body */}
      {body && (
        <Row className="mb-5">
          <Col>
            <div
              className="fs-5 lh-lg"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </Col>
        </Row>
      )}

      {/* Gallery */}
      {gallery?.length > 0 && (
        <Row>
          <Col>
            <h3 className="mb-3 fw-semibold">📷 Gallery</h3>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
              }}
              className="custom-swiper mb-5"
            >
              {gallery.map((img) => (
                <SwiperSlide key={img?.target_id || img?.url}>
                  <div className="ratio ratio-16x9">
                    <img
                      src={img?.url || def_blog_image}
                      alt={img?.alt || "Gallery image"}
                      className="w-100 h-100 object-fit-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = def_blog_image;
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BlogDetails;
